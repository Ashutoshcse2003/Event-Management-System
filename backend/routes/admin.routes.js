import express from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";

const useInMemory = global.useInMemory;
let User, Vendor, Product, Order;

if (useInMemory) {
  const models = await import("../models/memory.models.js");
  User = models.User;
  Vendor = models.Vendor;
  Product = models.Product;
  Order = models.Order;
} else {
  User = (await import("../models/User.model.js")).default;
  Vendor = (await import("../models/Vendor.model.js")).default;
  Product = (await import("../models/Product.model.js")).default;
  Order = (await import("../models/Order.model.js")).default;
}

const router = express.Router();

// All routes are protected and require admin role
router.use(protect, authorize("admin"));

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private (Admin)
router.get("/dashboard", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalVendors = await Vendor.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const pendingVendors = await Vendor.countDocuments({ status: "pending" });
    const activeVendors = await Vendor.countDocuments({ status: "active" });

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("userId", "name email")
      .populate("items.vendorId", "storeName");

    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$amounts.total" } } },
    ]);

    res.json({
      status: "success",
      data: {
        stats: {
          totalUsers,
          totalVendors,
          totalProducts,
          totalOrders,
          pendingVendors,
          activeVendors,
          totalRevenue: totalRevenue[0]?.total || 0,
        },
        recentOrders,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching dashboard data",
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin)
router.get("/users", async (req, res) => {
  try {
    const { role, status, search } = req.query;

    let query = {};

    if (role) query.role = role;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    // Remove passwords from response
    const usersWithoutPasswords = users.map((u) => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });

    res.json({
      status: "success",
      count: usersWithoutPasswords.length,
      data: { users: usersWithoutPasswords },
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching users",
    });
  }
});

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status
// @access  Private (Admin)
router.put("/users/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive", "suspended"].includes(status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid status value",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    res.json({
      status: "success",
      message: "User status updated successfully",
      data: { user: userWithoutPassword },
    });
  } catch (error) {
    console.error("Update user status error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while updating user status",
    });
  }
});

// @route   GET /api/admin/vendors
// @desc    Get all vendors
// @access  Private (Admin)
router.get("/vendors", async (req, res) => {
  try {
    const { status, category } = req.query;

    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;

    const vendors = await Vendor.find(query)
      .sort({ createdAt: -1 })
      .populate("userId", "name email phone");

    res.json({
      status: "success",
      count: vendors.length,
      data: { vendors },
    });
  } catch (error) {
    console.error("Get vendors error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching vendors",
    });
  }
});

// @route   PUT /api/admin/vendors/:id/approve
// @desc    Approve/reject vendor
// @access  Private (Admin)
router.put("/vendors/:id/approve", async (req, res) => {
  try {
    const { status } = req.body; // 'active' or 'inactive'

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        status: "error",
        message: "Status must be either active or inactive",
      });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        status,
        approvedAt: status === "active" ? new Date() : null,
        approvedBy: status === "active" ? req.user.id : null,
      },
      { new: true }
    ).populate("userId", "name email");

    if (!vendor) {
      return res.status(404).json({
        status: "error",
        message: "Vendor not found",
      });
    }

    // Update user role to vendor if approved
    if (status === "active") {
      await User.findByIdAndUpdate(vendor.userId._id, { role: "vendor" });
    }

    res.json({
      status: "success",
      message: `Vendor ${
        status === "active" ? "approved" : "rejected"
      } successfully`,
      data: { vendor },
    });
  } catch (error) {
    console.error("Approve vendor error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while approving vendor",
    });
  }
});

// @route   GET /api/admin/products
// @desc    Get all products
// @access  Private (Admin)
router.get("/products", async (req, res) => {
  try {
    const { status, category } = req.query;

    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .populate("vendorId", "storeName category");

    res.json({
      status: "success",
      count: products.length,
      data: { products },
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching products",
    });
  }
});

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Private (Admin)
router.get("/orders", async (req, res) => {
  try {
    const { status, paymentStatus } = req.query;

    let query = {};

    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate("items.vendorId", "storeName")
      .populate("items.productId", "name");

    res.json({
      status: "success",
      count: orders.length,
      data: { orders },
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching orders",
    });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private (Admin)
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Prevent deleting admin accounts
    if (user.role === "admin") {
      return res.status(403).json({
        status: "error",
        message: "Cannot delete admin accounts",
      });
    }

    await user.deleteOne();

    res.json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while deleting user",
    });
  }
});

export default router;
