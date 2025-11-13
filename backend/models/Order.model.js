import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        vendorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vendor",
          required: true,
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        image: String,
        vendor: String,
      },
    ],
    customerInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pinCode: {
        type: String,
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: ["upi", "cod"],
        required: true,
      },
    },
    amounts: {
      subtotal: {
        type: Number,
        required: true,
      },
      serviceFee: {
        type: Number,
        default: 0,
      },
      gst: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "confirmed",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    trackingInfo: {
      status: String,
      updates: [
        {
          status: String,
          message: String,
          timestamp: Date,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique order ID
orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    this.orderId =
      "ORD" +
      Date.now() +
      Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
