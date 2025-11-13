import express from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";

const useInMemory = global.useInMemory;
let Product, Vendor;

if (useInMemory) {
  const models = await import("../models/memory.models.js");
  Product = models.Product;
  Vendor = models.Vendor;
} else {
  Product = (await import("../models/Product.model.js")).default;
  Vendor = (await import("../models/Vendor.model.js")).default;
}

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filters
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;

    let query = { status: "active" };

    // Category filter
    if (category && category !== "all") {
      query.category = category;
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Build sort object
    let sortOptions = {};
    if (sort === "price_asc") sortOptions.price = 1;
    else if (sort === "price_desc") sortOptions.price = -1;
    else if (sort === "rating") sortOptions.rating = -1;
    else if (sort === "newest") sortOptions.createdAt = -1;
    else sortOptions.createdAt = -1; // default

    const products = await Product.find(query)
      .sort(sortOptions)
      .populate("vendorId", "storeName rating location");

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

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "vendorId",
      "storeName rating location category"
    );

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    res.json({
      status: "success",
      data: { product },
    });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching product",
    });
  }
});

// @route   POST /api/products
// @desc    Create new product (vendors only)
// @access  Private (Vendor)
router.post("/", protect, authorize("vendor", "admin"), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      discount,
      category,
      images,
      stock,
      specifications,
    } = req.body;

    // Get vendor info
    const vendor = await Vendor.findOne({ userId: req.user.id });

    if (!vendor) {
      return res.status(404).json({
        status: "error",
        message: "Vendor profile not found",
      });
    }

    if (vendor.status !== "active") {
      return res.status(403).json({
        status: "error",
        message: "Your vendor account is not active",
      });
    }

    // Create product
    const product = await Product.create({
      vendorId: vendor._id,
      name,
      description,
      price,
      originalPrice,
      discount,
      category,
      images,
      stock,
      specifications,
    });

    // Update vendor's product count
    vendor.totalProducts += 1;
    await vendor.save();

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: { product },
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while creating product",
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product (vendors only)
// @access  Private (Vendor)
router.put("/:id", protect, authorize("vendor", "admin"), async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    // Check ownership (unless admin)
    const vendor = await Vendor.findOne({ userId: req.user.id });
    if (
      req.user.role !== "admin" &&
      product.vendorId.toString() !== vendor._id.toString()
    ) {
      return res.status(403).json({
        status: "error",
        message: "Not authorized to update this product",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      status: "success",
      message: "Product updated successfully",
      data: { product },
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while updating product",
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product (vendors only)
// @access  Private (Vendor)
router.delete(
  "/:id",
  protect,
  authorize("vendor", "admin"),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Product not found",
        });
      }

      // Check ownership (unless admin)
      const vendor = await Vendor.findOne({ userId: req.user.id });
      if (
        req.user.role !== "admin" &&
        product.vendorId.toString() !== vendor._id.toString()
      ) {
        return res.status(403).json({
          status: "error",
          message: "Not authorized to delete this product",
        });
      }

      await product.deleteOne();

      // Update vendor's product count
      if (vendor) {
        vendor.totalProducts = Math.max(0, vendor.totalProducts - 1);
        await vendor.save();
      }

      res.json({
        status: "success",
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Delete product error:", error);
      res.status(500).json({
        status: "error",
        message: "Server error while deleting product",
      });
    }
  }
);

// @route   GET /api/products/categories/list
// @desc    Get all categories
// @access  Public
router.get("/categories/list", (req, res) => {
  const categories = [
    "electronics",
    "fashion",
    "home",
    "books",
    "sports",
    "toys",
    "other",
  ];

  res.json({
    status: "success",
    data: { categories },
  });
});

export default router;
