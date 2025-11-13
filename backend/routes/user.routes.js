import express from "express";
import { protect } from "../middleware/auth.middleware.js";

const useInMemory = global.useInMemory;
let User, Order;

if (useInMemory) {
  const models = await import("../models/memory.models.js");
  User = models.User;
  Order = models.Order;
} else {
  User = (await import("../models/User.model.js")).default;
  Order = (await import("../models/Order.model.js")).default;
}

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      status: "success",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          address: user.address,
          status: user.status,
          orderCount: user.orderCount,
          totalSpent: user.totalSpent,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching profile",
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address },
      { new: true, runValidators: true }
    );

    res.json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while updating profile",
    });
  }
});

// @route   PUT /api/users/change-password
// @desc    Change user password
// @access  Private
router.put("/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: "error",
        message: "Please provide current and new password",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while changing password",
    });
  }
});

// @route   GET /api/users/orders
// @desc    Get user's order history
// @access  Private
router.get("/orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("items.productId", "name images category")
      .populate("items.vendorId", "storeName");

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

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get("/stats", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const orders = await Order.find({ userId: req.user.id });

    const stats = {
      totalOrders: user.orderCount,
      totalSpent: user.totalSpent,
      pendingOrders: orders.filter(
        (o) => o.status === "pending" || o.status === "confirmed"
      ).length,
      deliveredOrders: orders.filter((o) => o.status === "delivered").length,
      cancelledOrders: orders.filter((o) => o.status === "cancelled").length,
    };

    res.json({
      status: "success",
      data: { stats },
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching statistics",
    });
  }
});

export default router;
