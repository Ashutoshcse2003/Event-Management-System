import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.model.js";
import Vendor from "./models/Vendor.model.js";
import Product from "./models/Product.model.js";
import connectDB from "./config/database.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Vendor.deleteMany();
    await Product.deleteMany();

    console.log("🗑️  Cleared existing data");

    // Create Admin User
    const admin = await User.create({
      name: "Admin",
      email: "admin@eventmart.com",
      password: "admin123",
      role: "admin",
      phone: "9876543210",
      status: "active",
    });

    console.log("✅ Admin created:", admin.email);

    // Create Sample Users
    const user1 = await User.create({
      name: "Rahul Kumar",
      email: "rahul@example.com",
      password: "user123",
      role: "user",
      phone: "9876543211",
      status: "active",
      address: {
        street: "123 MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        pinCode: "400001",
      },
    });

    const user2 = await User.create({
      name: "Priya Sharma",
      email: "priya@example.com",
      password: "user123",
      role: "user",
      phone: "9876543212",
      status: "active",
      address: {
        street: "456 Park Street",
        city: "Kolkata",
        state: "West Bengal",
        pinCode: "700001",
      },
    });

    console.log("✅ Users created");

    // Create Vendor Users
    const vendorUser1 = await User.create({
      name: "TechWorld Electronics",
      email: "vendor1@example.com",
      password: "vendor123",
      role: "vendor",
      phone: "9876543213",
      status: "active",
    });

    const vendorUser2 = await User.create({
      name: "Fashion Hub",
      email: "vendor2@example.com",
      password: "vendor123",
      role: "vendor",
      phone: "9876543214",
      status: "active",
    });

    const vendorUser3 = await User.create({
      name: "HomeComfort Store",
      email: "vendor3@example.com",
      password: "vendor123",
      role: "vendor",
      phone: "9876543215",
      status: "active",
    });

    const vendorUser4 = await User.create({
      name: "Book Paradise",
      email: "vendor4@example.com",
      password: "vendor123",
      role: "vendor",
      phone: "9876543216",
      status: "active",
    });

    const vendorUser5 = await User.create({
      name: "Sports Zone",
      email: "vendor5@example.com",
      password: "vendor123",
      role: "vendor",
      phone: "9876543217",
      status: "active",
    });

    console.log("✅ Vendor users created");

    // Create Vendors
    const vendor1 = await Vendor.create({
      userId: vendorUser1._id,
      storeName: "TechWorld Electronics",
      category: "electronics",
      description: "Premium electronic gadgets and accessories",
      location: "Delhi",
      rating: 4.5,
      status: "active",
      approvedAt: new Date(),
      approvedBy: admin._id,
    });

    const vendor2 = await Vendor.create({
      userId: vendorUser2._id,
      storeName: "Fashion Hub",
      category: "fashion",
      description: "Latest fashion trends and clothing",
      location: "Mumbai",
      rating: 4.3,
      status: "active",
      approvedAt: new Date(),
      approvedBy: admin._id,
    });

    const vendor3 = await Vendor.create({
      userId: vendorUser3._id,
      storeName: "HomeComfort Store",
      category: "home",
      description: "Home appliances and kitchen essentials",
      location: "Bangalore",
      rating: 4.2,
      status: "active",
      approvedAt: new Date(),
      approvedBy: admin._id,
    });

    const vendor4 = await Vendor.create({
      userId: vendorUser4._id,
      storeName: "Book Paradise",
      category: "books",
      description: "Wide collection of books and novels",
      location: "Pune",
      rating: 4.6,
      status: "active",
      approvedAt: new Date(),
      approvedBy: admin._id,
    });

    const vendor5 = await Vendor.create({
      userId: vendorUser5._id,
      storeName: "Sports Zone",
      category: "sports",
      description: "Sports equipment and fitness gear",
      location: "Hyderabad",
      rating: 4.4,
      status: "active",
      approvedAt: new Date(),
      approvedBy: admin._id,
    });

    console.log("✅ Vendors created");

    // Create Products
    const products = [
      // Electronics
      {
        vendorId: vendor1._id,
        name: "Wireless Headphones",
        description:
          "Premium noise-cancelling wireless headphones with 30-hour battery life",
        price: 2499,
        originalPrice: 3999,
        discount: 37,
        category: "electronics",
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        ],
        stock: 50,
        rating: 4.5,
        reviewCount: 120,
      },
      {
        vendorId: vendor1._id,
        name: "Smart Watch Pro",
        description:
          "Feature-packed smartwatch with fitness tracking and notifications",
        price: 4999,
        originalPrice: 7999,
        discount: 37,
        category: "electronics",
        images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        ],
        stock: 30,
        rating: 4.6,
        reviewCount: 85,
      },
      {
        vendorId: vendor1._id,
        name: "Bluetooth Speaker",
        description:
          "Portable waterproof Bluetooth speaker with amazing sound quality",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        category: "electronics",
        images: [
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        ],
        stock: 75,
        rating: 4.4,
        reviewCount: 210,
      },

      // Fashion
      {
        vendorId: vendor2._id,
        name: "Casual Cotton Shirt",
        description: "Comfortable cotton shirt perfect for casual wear",
        price: 799,
        originalPrice: 1299,
        discount: 38,
        category: "fashion",
        images: [
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
        ],
        stock: 100,
        rating: 4.2,
        reviewCount: 156,
      },
      {
        vendorId: vendor2._id,
        name: "Denim Jeans",
        description: "Classic fit denim jeans with premium quality fabric",
        price: 1499,
        originalPrice: 2499,
        discount: 40,
        category: "fashion",
        images: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        ],
        stock: 80,
        rating: 4.3,
        reviewCount: 95,
      },
      {
        vendorId: vendor2._id,
        name: "Designer Handbag",
        description: "Stylish designer handbag with multiple compartments",
        price: 2999,
        originalPrice: 4999,
        discount: 40,
        category: "fashion",
        images: [
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
        ],
        stock: 45,
        rating: 4.5,
        reviewCount: 67,
      },

      // Home & Kitchen
      {
        vendorId: vendor3._id,
        name: "Coffee Maker",
        description: "Automatic coffee maker with programmable timer",
        price: 3499,
        originalPrice: 5999,
        discount: 41,
        category: "home",
        images: [
          "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
        ],
        stock: 25,
        rating: 4.4,
        reviewCount: 89,
      },
      {
        vendorId: vendor3._id,
        name: "Kitchen Knife Set",
        description: "Professional 6-piece stainless steel knife set",
        price: 1999,
        originalPrice: 3499,
        discount: 42,
        category: "home",
        images: [
          "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500",
        ],
        stock: 60,
        rating: 4.6,
        reviewCount: 134,
      },
      {
        vendorId: vendor3._id,
        name: "Non-Stick Cookware Set",
        description: "5-piece non-stick cookware set for healthy cooking",
        price: 2999,
        originalPrice: 5499,
        discount: 45,
        category: "home",
        images: [
          "https://images.unsplash.com/photo-1584990347449-39b2e1b1c46d?w=500",
        ],
        stock: 40,
        rating: 4.3,
        reviewCount: 78,
      },

      // Books
      {
        vendorId: vendor4._id,
        name: "The Great Novel",
        description: "Bestselling fiction novel by renowned author",
        price: 299,
        originalPrice: 499,
        discount: 40,
        category: "books",
        images: [
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
        ],
        stock: 200,
        rating: 4.7,
        reviewCount: 342,
      },
      {
        vendorId: vendor4._id,
        name: "Self-Help Book Collection",
        description: "Set of 3 popular self-help and motivation books",
        price: 899,
        originalPrice: 1497,
        discount: 40,
        category: "books",
        images: [
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
        ],
        stock: 150,
        rating: 4.5,
        reviewCount: 267,
      },
      {
        vendorId: vendor4._id,
        name: "Programming Guide",
        description: "Complete guide to modern programming languages",
        price: 399,
        originalPrice: 699,
        discount: 42,
        category: "books",
        images: [
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
        ],
        stock: 120,
        rating: 4.8,
        reviewCount: 189,
      },

      // Sports
      {
        vendorId: vendor5._id,
        name: "Yoga Mat Premium",
        description: "Extra thick yoga mat with carrying strap",
        price: 699,
        originalPrice: 1299,
        discount: 46,
        category: "sports",
        images: [
          "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
        ],
        stock: 90,
        rating: 4.4,
        reviewCount: 156,
      },
      {
        vendorId: vendor5._id,
        name: "Dumbbells Set",
        description: "Adjustable dumbbells set (2.5kg to 25kg)",
        price: 3999,
        originalPrice: 6999,
        discount: 42,
        category: "sports",
        images: [
          "https://images.unsplash.com/photo-1591940742878-13aba4b97e57?w=500",
        ],
        stock: 35,
        rating: 4.5,
        reviewCount: 98,
      },
      {
        vendorId: vendor5._id,
        name: "Badminton Racket Set",
        description: "Professional badminton racket set with shuttlecocks",
        price: 1499,
        originalPrice: 2499,
        discount: 40,
        category: "sports",
        images: [
          "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500",
        ],
        stock: 55,
        rating: 4.3,
        reviewCount: 112,
      },
    ];

    await Product.insertMany(products);

    // Update vendor product counts
    await Vendor.findByIdAndUpdate(vendor1._id, { totalProducts: 3 });
    await Vendor.findByIdAndUpdate(vendor2._id, { totalProducts: 3 });
    await Vendor.findByIdAndUpdate(vendor3._id, { totalProducts: 3 });
    await Vendor.findByIdAndUpdate(vendor4._id, { totalProducts: 3 });
    await Vendor.findByIdAndUpdate(vendor5._id, { totalProducts: 3 });

    console.log("✅ Products created");

    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📝 Login Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Admin:");
    console.log("  Email: admin@eventmart.com");
    console.log("  Password: admin123");
    console.log("\nUser:");
    console.log("  Email: rahul@example.com");
    console.log("  Password: user123");
    console.log("\nVendor:");
    console.log("  Email: vendor1@example.com");
    console.log("  Password: vendor123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
