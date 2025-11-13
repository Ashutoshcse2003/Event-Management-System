import express from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";

const useInMemory = global.useInMemory;
let Order, Product, User, Vendor;

if (useInMemory) {
  const models = await import("../models/memory.models.js");
  Order = models.Order;
  Product = models.Product;
  User = models.User;
  Vendor = models.Vendor;
} else {
  Order = (await import("../models/Order.model.js")).default;
  Product = (await import("../models/Product.model.js")).default;
  User = (await import("../models/User.model.js")).default;
  Vendor = (await import("../models/Vendor.model.js")).default;
}

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order
// @access  Private (User)
router.post("/", protect, async (req, res) => {
  try {
    const { items, customerInfo, amounts, paymentMethod } = req.body;

    // Validate required fields
    if (!items || items.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Order must contain at least one item",
      });
    }

    if (!customerInfo || !customerInfo.name || !customerInfo.email) {
      return res.status(400).json({
        status: "error",
        message: "Customer information is required",
      });
    }

    // Verify products exist and update stock
    for (let item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          status: "error",
          message: `Product ${item.name} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          status: "error",
          message: `Insufficient stock for ${product.name}`,
        });
      }

      // Update stock and sold count
      product.stock -= item.quantity;
      product.sold += item.quantity;
      if (product.stock === 0) {
        product.status = "out_of_stock";
      }
      await product.save();
    }

    // Create order with pending status for vendor acceptance
    const order = await Order.create({
      userId: req.user._id,
      items,
      customerInfo: {
        ...customerInfo,
        paymentMethod: paymentMethod || "upi",
      },
      amounts,
      status: "pending", // Waiting for vendor acceptance
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      trackingInfo: {
        status: "pending",
        updates: [
          {
            status: "pending",
            message: "Order placed, waiting for vendor confirmation",
            timestamp: new Date(),
          },
        ],
      },
    });

    // Update user's order count and total spent
    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        orderCount: 1,
        totalSpent: amounts.total,
      },
    });

    // Update vendor revenue (pending until order confirmed)
    for (let item of items) {
      await Vendor.findByIdAndUpdate(item.vendorId, {
        $inc: { totalRevenue: item.price * item.quantity },
      });
    }

    // Populate order details for response
    const populatedOrder = await Order.findById(order._id)
      .populate("items.productId", "name images category")
      .populate("items.vendorId", "storeName");

    res.status(201).json({
      status: "success",
      message: "Order placed successfully. Waiting for vendor confirmation.",
      data: { order: populatedOrder },
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while creating order",
    });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders with real-time status
// @access  Private (User)
router.get("/", protect, async (req, res) => {
  try {
    const { status } = req.query;

    let query = { userId: req.user._id };
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate("items.productId", "name images category")
      .populate("items.vendorId", "storeName location rating");

    // Add status labels for frontend
    const ordersWithLabels = orders.map((order) => {
      const orderObj = order.toObject();

      // Add user-friendly status labels
      const statusLabels = {
        pending: "Pending Confirmation",
        confirmed: "Confirmed",
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
      };

      orderObj.statusLabel = statusLabels[orderObj.status] || orderObj.status;
      orderObj.canCancel = ["pending", "confirmed"].includes(orderObj.status);

      return orderObj;
    });

    res.json({
      status: "success",
      count: ordersWithLabels.length,
      data: { orders: ordersWithLabels },
    });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching orders",
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.productId", "name images category")
      .populate("items.vendorId", "storeName")
      .populate("userId", "name email phone");

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    // Check authorization (user, vendor of ordered items, or admin)
    const vendor = await Vendor.findOne({ userId: req.user.id });
    const isVendorInOrder =
      vendor &&
      order.items.some(
        (item) => item.vendorId.toString() === vendor._id.toString()
      );

    if (
      order.userId._id.toString() !== req.user.id &&
      !isVendorInOrder &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        status: "error",
        message: "Not authorized to view this order",
      });
    }

    res.json({
      status: "success",
      data: { order },
    });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching order",
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (vendors/admin only)
// @access  Private (Vendor/Admin)
router.put(
  "/:id/status",
  protect,
  authorize("vendor", "admin"),
  async (req, res) => {
    try {
      const { status, message } = req.body;

      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({
          status: "error",
          message: "Order not found",
        });
      }

      // Check authorization
      const vendor = await Vendor.findOne({ userId: req.user.id });
      const isVendorInOrder =
        vendor &&
        order.items.some(
          (item) => item.vendorId.toString() === vendor._id.toString()
        );

      if (!isVendorInOrder && req.user.role !== "admin") {
        return res.status(403).json({
          status: "error",
          message: "Not authorized to update this order",
        });
      }

      // Update status
      order.status = status;
      order.trackingInfo.status = status;
      order.trackingInfo.updates.push({
        status,
        message: message || `Order ${status}`,
        timestamp: new Date(),
      });

      await order.save();

      res.json({
        status: "success",
        message: "Order status updated successfully",
        data: { order },
      });
    } catch (error) {
      console.error("Update order status error:", error);
      res.status(500).json({
        status: "error",
        message: "Server error while updating order",
      });
    }
  }
);

// @route   GET /api/orders/vendor/all
// @desc    Get all orders for vendor (with filtering)
// @access  Private (Vendor)
router.get("/vendor/all", protect, authorize("vendor"), async (req, res) => {
  try {
    const { status } = req.query;

    const vendor = await Vendor.findOne({ userId: req.user._id });

    if (!vendor) {
      return res.status(404).json({
        status: "error",
        message: "Vendor profile not found",
      });
    }

    // Build query
    let query = { "items.vendorId": vendor._id };
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate("userId", "name email phone")
      .populate("items.productId", "name images category")
      .populate("items.vendorId", "storeName");

    // Filter items to only show vendor's products
    const filteredOrders = orders.map((order) => {
      const orderObj = order.toObject();
      orderObj.items = orderObj.items.filter(
        (item) => item.vendorId._id.toString() === vendor._id.toString()
      );

      // Recalculate amounts for this vendor's items only
      const vendorSubtotal = orderObj.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      orderObj.vendorAmount = vendorSubtotal;

      return orderObj;
    });

    // Calculate statistics
    const stats = {
      total: filteredOrders.length,
      pending: filteredOrders.filter((o) => o.status === "pending").length,
      confirmed: filteredOrders.filter((o) => o.status === "confirmed").length,
      processing: filteredOrders.filter((o) => o.status === "processing")
        .length,
      shipped: filteredOrders.filter((o) => o.status === "shipped").length,
      delivered: filteredOrders.filter((o) => o.status === "delivered").length,
      cancelled: filteredOrders.filter((o) => o.status === "cancelled").length,
    };

    res.json({
      status: "success",
      count: filteredOrders.length,
      stats,
      data: { orders: filteredOrders },
    });
  } catch (error) {
    console.error("Get vendor orders error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching orders",
    });
  }
});

// @route   GET /api/orders/vendor/pending
// @desc    Get pending orders awaiting vendor action
// @access  Private (Vendor)
router.get(
  "/vendor/pending",
  protect,
  authorize("vendor"),
  async (req, res) => {
    try {
      const vendor = await Vendor.findOne({ userId: req.user._id });

      if (!vendor) {
        return res.status(404).json({
          status: "error",
          message: "Vendor profile not found",
        });
      }

      const pendingOrders = await Order.find({
        "items.vendorId": vendor._id,
        status: "pending",
      })
        .sort({ createdAt: -1 })
        .populate("userId", "name email phone address")
        .populate("items.productId", "name images category price")
        .populate("items.vendorId", "storeName");

      // Filter to show only this vendor's items
      const filteredOrders = pendingOrders.map((order) => {
        const orderObj = order.toObject();
        orderObj.items = orderObj.items.filter(
          (item) => item.vendorId._id.toString() === vendor._id.toString()
        );
        return orderObj;
      });

      res.json({
        status: "success",
        count: filteredOrders.length,
        data: { orders: filteredOrders },
      });
    } catch (error) {
      console.error("Get pending orders error:", error);
      res.status(500).json({
        status: "error",
        message: "Server error while fetching pending orders",
      });
    }
  }
);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order (user can cancel pending/confirmed orders)
// @access  Private (User)
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    // Check if user owns this order
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: "error",
        message: "Not authorized to cancel this order",
      });
    }

    // Check if order can be cancelled
    if (!["pending", "confirmed"].includes(order.status)) {
      return res.status(400).json({
        status: "error",
        message: "Order cannot be cancelled at this stage",
      });
    }

    // Cancel order
    order.status = "cancelled";
    order.trackingInfo.status = "cancelled";
    order.trackingInfo.updates.push({
      status: "cancelled",
      message: "Order cancelled by customer",
      timestamp: new Date(),
    });

    // Restore product stock
    for (let item of order.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock += item.quantity;
        product.sold -= item.quantity;
        if (product.stock > 0 && product.status === "out_of_stock") {
          product.status = "active";
        }
        await product.save();
      }
    }

    // Reverse vendor revenue
    for (let item of order.items) {
      await Vendor.findByIdAndUpdate(item.vendorId, {
        $inc: { totalRevenue: -(item.price * item.quantity) },
      });
    }

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        orderCount: -1,
        totalSpent: -order.amounts.total,
      },
    });

    await order.save();

    res.json({
      status: "success",
      message: "Order cancelled successfully",
      data: { order },
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while cancelling order",
    });
  }
});

export default router;
