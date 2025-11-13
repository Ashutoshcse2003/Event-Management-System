import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log("\n⚠️  MongoDB is not running. Please start MongoDB:");
    console.log("   - Windows: Run 'mongod' or start MongoDB service");
    console.log("   - Or use MongoDB Atlas (cloud database)");
    console.log("\n🔄 Falling back to in-memory database...\n");

    // Fallback to in-memory database
    global.useInMemory = true;
  }
};

export default connectDB;
