import express from "express";
import bcrypt from "bcryptjs";
import { generateToken, protect } from "../middleware/auth.middleware.js";

// Dynamic model import based on database type
const useInMemory = global.useInMemory;
let User, Vendor;

if (useInMemory) {
  const models = await import("../models/memory.models.js");
  User = models.User;
  Vendor = models.Vendor;
} else {
  User = (await import("../models/User.model.js")).default;
  Vendor = (await import("../models/Vendor.model.js")).default;
}

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, role, address } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide name, email and password",
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: "error",
        message: "User already exists with this email",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || "user",
      address,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error during signup",
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide email and password",
      });
    }

    // Find user and include password
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    // Check role if provided
    if (role && user.role !== role) {
      return res.status(403).json({
        status: "error",
        message: `This account is not registered as ${role}`,
      });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    // Check account status
    if (user.status !== "active") {
      return res.status(403).json({
        status: "error",
        message: "Your account is not active. Please contact support.",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Get vendor info if user is a vendor
    let vendorInfo = null;
    if (user.role === "vendor") {
      vendorInfo = await Vendor.findOne({ userId: user._id });
    }

    res.json({
      status: "success",
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
        },
        vendor: vendorInfo,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error during login",
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    let vendorInfo = null;
    if (user.role === "vendor") {
      vendorInfo = await Vendor.findOne({ userId: user._id });
    }

    res.json({
      status: "success",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
          orderCount: user.orderCount,
          totalSpent: user.totalSpent,
        },
        vendor: vendorInfo,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side should remove token)
// @access  Private
router.post("/logout", protect, (req, res) => {
  res.json({
    status: "success",
    message: "Logged out successfully",
  });
});

export default router;
