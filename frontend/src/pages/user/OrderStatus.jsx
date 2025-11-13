import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Calendar,
  DollarSign,
  Store,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import Button from "../../components/Button";
import { orderAPI } from "../../api/order.api";
import { useToast } from "../../contexts/ToastContext";

export default function OrderStatus() {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      const response = await orderAPI.getUserOrders();
      if (response.status === "success") {
        setOrders(response.data.orders || []);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function refreshOrders() {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
    toast.success("Orders refreshed");
  }

  async function cancelOrder(orderId) {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      const response = await orderAPI.cancelOrder(orderId);
      if (response.status === "success") {
        toast.success("Order cancelled successfully");
        loadOrders(); // Reload orders
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          color: "from-yellow-500 to-yellow-600",
          bg: "bg-yellow-500",
          text: "Pending Confirmation",
        };
      case "confirmed":
        return {
          icon: CheckCircle,
          color: "from-green-500 to-green-600",
          bg: "bg-green-500",
          text: "Confirmed",
        };
      case "processing":
        return {
          icon: Package,
          color: "from-blue-500 to-blue-600",
          bg: "bg-blue-500",
          text: "Processing",
        };
      case "shipped":
        return {
          icon: Truck,
          color: "from-purple-500 to-purple-600",
          bg: "bg-purple-500",
          text: "Shipped",
        };
      case "delivered":
        return {
          icon: CheckCircle,
          color: "from-success to-success-dark",
          bg: "bg-success",
          text: "Delivered",
        };
      case "cancelled":
        return {
          icon: XCircle,
          color: "from-error to-error-dark",
          bg: "bg-error",
          text: "Cancelled",
        };
      default:
        return {
          icon: Package,
          color: "from-neutral-400 to-neutral-500",
          bg: "bg-neutral-400",
          text: "Unknown",
        };
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    processing: orders.filter((o) => o.status === "processing").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
              Order Status 📦
            </h1>
            <p className="text-neutral-600">Track your orders and bookings</p>
          </div>
          <Button
            variant="secondary"
            onClick={refreshOrders}
            leftIcon={
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
            }
            disabled={refreshing}
          >
            Refresh
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          {[
            {
              label: "Total",
              value: stats.total,
              icon: Package,
              color: "from-primary-500 to-secondary-400",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: Clock,
              color: "from-yellow-500 to-yellow-600",
            },
            {
              label: "Confirmed",
              value: stats.confirmed,
              icon: CheckCircle,
              color: "from-green-500 to-green-600",
            },
            {
              label: "Processing",
              value: stats.processing,
              icon: Package,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Delivered",
              value: stats.delivered,
              icon: CheckCircle,
              color: "from-success to-success-dark",
            },
            {
              label: "Cancelled",
              value: stats.cancelled,
              icon: XCircle,
              color: "from-error to-error-dark",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-neutral-600">
                  {stat.label}
                </p>
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <p
                className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-neutral-600">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center"
          >
            <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">
              No orders yet
            </h3>
            <p className="text-neutral-500">
              Start shopping to see your orders here
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {orders.map((order, index) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-3">
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${statusConfig.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <StatusIcon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className="font-mono font-semibold text-lg text-primary-600">
                              #{order._id.slice(-8).toUpperCase()}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium text-white ${statusConfig.bg}`}
                            >
                              {statusConfig.text}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Ordered on {formatDate(order.createdAt)}
                            </span>
                          </div>

                          {/* Items */}
                          <div className="space-y-1 mb-3">
                            {order.items?.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm"
                              >
                                <Package className="w-3 h-3 text-neutral-400" />
                                <span className="text-neutral-700">
                                  {item.productId?.name || "Product"} ×{" "}
                                  {item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Amount & Vendor */}
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-success" />
                              <span className="font-semibold text-neutral-900">
                                {formatCurrency(order.amounts?.total || 0)}
                              </span>
                            </div>
                            {order.items?.[0]?.vendorId && (
                              <div className="flex items-center gap-2 text-neutral-600">
                                <Store className="w-4 h-4" />
                                <span>
                                  {order.items[0].vendorId.storeName ||
                                    "Vendor"}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Latest Update */}
                          {order.trackingInfo?.updates?.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-neutral-200">
                              <div className="flex items-start gap-2 text-sm">
                                <AlertCircle className="w-4 h-4 mt-0.5 text-primary-600 flex-shrink-0" />
                                <div className="text-neutral-600">
                                  <span className="font-medium">
                                    Latest Update:{" "}
                                  </span>
                                  {
                                    order.trackingInfo.updates[
                                      order.trackingInfo.updates.length - 1
                                    ]?.message
                                  }
                                  <span className="text-xs text-neutral-500 ml-2">
                                    (
                                    {formatDate(
                                      order.trackingInfo.updates[
                                        order.trackingInfo.updates.length - 1
                                      ]?.timestamp
                                    )}
                                    )
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 lg:min-w-[150px]">
                      {order.canCancel && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => cancelOrder(order._id)}
                          leftIcon={<XCircle className="w-4 h-4" />}
                        >
                          Cancel Order
                        </Button>
                      )}
                      {order.status === "pending" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                          <Clock className="w-4 h-4 mb-1" />
                          Waiting for vendor confirmation
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
