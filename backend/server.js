import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { seedDatabase } from "./seedData.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize in-memory database as fallback
global.db = {
  users: [],
  vendors: [],
  products: [],
  orders: [],
};
global.useInMemory = false;

// Connect to MongoDB
await connectDB();

// Seed database if using in-memory or if MongoDB is empty
if (global.useInMemory) {
  console.log("📦 Using in-memory database (No MongoDB connection)");
  await seedDatabase();
} else {
  // Check if MongoDB database is empty and seed if needed
  const mongoose = await import("mongoose");
  const User = (await import("./models/User.model.js")).default;
  const userCount = await User.countDocuments();

  if (userCount === 0) {
    console.log("📦 MongoDB is empty, seeding database...");
    await seedDatabase();
  } else {
    console.log(`📊 Database has ${userCount} users already`);
  }
}

// Security Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});
