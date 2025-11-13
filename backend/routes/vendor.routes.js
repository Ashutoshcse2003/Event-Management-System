import express from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";

const useInMemory = global.useInMemory;
let Vendor, Product;

if (useInMemory) {
  const models = await import("../models/memory.models.js");
  Vendor = models.Vendor;
  Product = models.Product;
} else {
  Vendor = (await import("../models/Vendor.model.js")).default;
  Product = (await import("../models/Product.model.js")).default;
}

const router = express.Router();

// @route   POST /api/vendors/register
// @desc    Register as vendor
// @access  Private (User)
router.post("/register", protect, async (req, res) => {
  try {
    const { storeName, category, description, location } = req.body;

    // Check if user already has a vendor account
    const existingVendor = await Vendor.findOne({ userId: req.user.id });

    if (existingVendor) {
      return res.status(400).json({
        status: "error",
        message: "You already have a vendor account",
      });
    }

    // Create vendor
    const vendor = await Vendor.create({
      userId: req.user.id,
      storeName,
      category,
      description,
      location,
      status: "pending", // Requires admin approval
    });

    res.status(201).json({
      status: "success",
      message: "Vendor registration submitted. Awaiting admin approval.",
      data: { vendor },
    });
  } catch (error) {
    console.error("Vendor registration error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error during vendor registration",
    });
  }
});

// @route   GET /api/vendors
// @desc    Get all vendors
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { category, status } = req.query;

    let query = {};

    // Filter by category
    if (category && category !== "all") {
      query.category = category;
    }

    // Filter by status (default to active for public access)
    query.status = status || "active";

    const vendors = await Vendor.find(query)
      .populate("userId", "name email phone")
      .sort({ rating: -1, createdAt: -1 });

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

// @route   GET /api/vendors/:id
// @desc    Get single vendor
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate(
      "userId",
      "name email phone"
    );

    if (!vendor) {
      return res.status(404).json({
        status: "error",
        message: "Vendor not found",
      });
    }

    // Get vendor's products
    const products = await Product.find({
      vendorId: vendor._id,
      status: "active",
    });

    res.json({
      status: "success",
      data: {
        vendor,
        products,
      },
    });
  } catch (error) {
    console.error("Get vendor error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching vendor",
    });
  }
});

// @route   GET /api/vendors/me/profile
// @desc    Get current vendor profile
// @access  Private (Vendor)
router.get("/me/profile", protect, authorize("vendor"), async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id }).populate(
      "userId",
      "name email phone"
    );

    if (!vendor) {
      return res.status(404).json({
        status: "error",
        message: "Vendor profile not found",
      });
    }

    // Get vendor's products
    const products = await Product.find({ vendorId: vendor._id });

    res.json({
      status: "success",
      data: {
        vendor,
        products,
      },
    });
  } catch (error) {
    console.error("Get vendor profile error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching profile",
    });
  }
});

// @route   PUT /api/vendors/me
// @desc    Update vendor profile
// @access  Private (Vendor)
router.put("/me", protect, authorize("vendor"), async (req, res) => {
  try {
    let vendor = await Vendor.findOne({ userId: req.user.id });

    if (!vendor) {
      return res.status(404).json({
        status: "error",
        message: "Vendor profile not found",
      });
    }

    const { storeName, category, description, location } = req.body;

    vendor = await Vendor.findByIdAndUpdate(
      vendor._id,
      { storeName, category, description, location },
      { new: true, runValidators: true }
    );

    res.json({
      status: "success",
      message: "Vendor profile updated successfully",
      data: { vendor },
    });
  } catch (error) {
    console.error("Update vendor error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while updating profile",
    });
  }
});

// @route   GET /api/vendors/me/products
// @desc    Get vendor's products
// @access  Private (Vendor)
router.get("/me/products", protect, authorize("vendor"), async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });

    if (!vendor) {
      return res.status(404).json({
        status: "error",
        message: "Vendor profile not found",
      });
    }

    const products = await Product.find({ vendorId: vendor._id }).sort({
      createdAt: -1,
    });

    res.json({
      status: "success",
      count: products.length,
      data: { products },
    });
  } catch (error) {
    console.error("Get vendor products error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching products",
    });
  }
});

// @route   GET /api/vendors/me/stats
// @desc    Get vendor statistics
// @access  Private (Vendor)
router.get("/me/stats", protect, authorize("vendor"), async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.id });

    if (!vendor) {
      return res.status(404).json({
        status: "error",
        message: "Vendor profile not found",
      });
    }

    const products = await Product.find({ vendorId: vendor._id });
    const totalStock = products.reduce(
      (sum, product) => sum + product.stock,
      0
    );
    const totalSold = products.reduce((sum, product) => sum + product.sold, 0);

    res.json({
      status: "success",
      data: {
        stats: {
          totalProducts: vendor.totalProducts,
          totalRevenue: vendor.totalRevenue,
          totalStock,
          totalSold,
          rating: vendor.rating,
          status: vendor.status,
        },
      },
    });
  } catch (error) {
    console.error("Get vendor stats error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching statistics",
    });
  }
});

export default router;
