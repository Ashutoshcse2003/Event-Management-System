import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Package,
  DollarSign,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Button from "../../components/Button";
import { useToast } from "../../contexts/ToastContext";
import { orderAPI } from "../../api/order.api";

export default function VendorTransactions() {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [statistics, setStatistics] = useState({
    pending: 0,
    confirmed: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("pending"); // pending, all

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    try {
      // Load pending orders
      const pendingResponse = await orderAPI.getVendorPendingOrders();
      if (pendingResponse.status === "success") {
        setPendingOrders(pendingResponse.data.orders || []);
      }

      // Load all orders with statistics
      const allResponse = await orderAPI.getVendorOrders();
      if (allResponse.status === "success") {
        setOrders(allResponse.data.orders || []);
        setStatistics(allResponse.data.statistics || {});
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function acceptOrder(orderId) {
    try {
      const response = await orderAPI.acceptOrder(orderId);
      if (response.status === "success") {
        toast.success("✅ Order accepted successfully");
        loadOrders(); // Reload orders
      }
    } catch (error) {
      console.error("Error accepting order:", error);
      toast.error(error.response?.data?.message || "Failed to accept order");
    }
  }

  async function rejectOrder(orderId) {
    try {
      const reason = prompt(
        "Please provide a reason for rejection (optional):"
      );
      const response = await orderAPI.rejectOrder(orderId, reason || "");
      if (response.status === "success") {
        toast.error("❌ Order rejected");
        loadOrders(); // Reload orders
      }
    } catch (error) {
      console.error("Error rejecting order:", error);
      toast.error(error.response?.data?.message || "Failed to reject order");
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
      case "delivered":
        return "bg-success text-white";
      case "cancelled":
        return "bg-error text-white";
      case "pending":
        return "bg-warning text-white";
      case "processing":
        return "bg-blue-500 text-white";
      case "shipped":
        return "bg-purple-500 text-white";
      default:
        return "bg-neutral-300 text-neutral-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
      case "delivered":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelled":
        return <XCircle className="w-5 h-5" />;
      case "pending":
        return <Clock className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
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

  const displayOrders = selectedTab === "pending" ? pendingOrders : orders;

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
            Orders & Transactions 📋
          </h1>
          <p className="text-neutral-600">
            Manage customer orders and requests
          </p>
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
              label: "Pending",
              value: statistics.pending || 0,
              icon: Clock,
              color: "from-warning to-warning-dark",
            },
            {
              label: "Confirmed",
              value: statistics.confirmed || 0,
              icon: CheckCircle,
              color: "from-success to-success-dark",
            },
            {
              label: "Processing",
              value: statistics.processing || 0,
              icon: Package,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Shipped",
              value: statistics.shipped || 0,
              icon: Package,
              color: "from-purple-500 to-purple-600",
            },
            {
              label: "Delivered",
              value: statistics.delivered || 0,
              icon: CheckCircle,
              color: "from-green-500 to-green-600",
            },
            {
              label: "Cancelled",
              value: statistics.cancelled || 0,
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

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 mb-6"
        >
          <Button
            variant={selectedTab === "pending" ? "primary" : "secondary"}
            onClick={() => setSelectedTab("pending")}
            leftIcon={<Clock className="w-4 h-4" />}
          >
            Pending ({pendingOrders.length})
          </Button>
          <Button
            variant={selectedTab === "all" ? "primary" : "secondary"}
            onClick={() => setSelectedTab("all")}
            leftIcon={<Package className="w-4 h-4" />}
          >
            All Orders ({orders.length})
          </Button>
        </motion.div>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-neutral-600">Loading orders...</p>
          </div>
        ) : displayOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center"
          >
            <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">
              No {selectedTab === "pending" ? "pending" : ""} orders found
            </h3>
            <p className="text-neutral-500">
              {selectedTab === "pending"
                ? "All orders have been processed"
                : "Orders will appear here once customers place them"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {displayOrders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all"
                >
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading font-semibold text-lg text-neutral-900">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mb-3">
                        {formatDate(order.createdAt)}
                      </p>

                      {/* Customer Info */}
                      <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-semibold text-neutral-700 mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" /> Customer Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-neutral-600">
                            <User className="w-3 h-3" />
                            <span>
                              {order.customerInfo?.name ||
                                order.userId?.name ||
                                "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-600">
                            <Phone className="w-3 h-3" />
                            <span>
                              {order.customerInfo?.phone ||
                                order.userId?.phone ||
                                "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-600">
                            <Mail className="w-3 h-3" />
                            <span>
                              {order.customerInfo?.email ||
                                order.userId?.email ||
                                "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-600">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">
                              {order.customerInfo?.address || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2">
                        {order.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 border-l-4 border-primary-500 pl-3 py-1"
                          >
                            <Package className="w-4 h-4 text-primary-600 flex-shrink-0" />
                            <div className="flex-1">
                              <span className="font-medium text-neutral-800">
                                {item.productId?.name || "Product"}
                              </span>
                              <span className="text-neutral-500 text-sm ml-2">
                                × {item.quantity}
                              </span>
                            </div>
                            <span className="font-semibold text-neutral-900">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Total Amount */}
                      <div className="mt-4 pt-4 border-t border-neutral-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-neutral-600 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" /> Total Amount
                          </span>
                          <span className="text-xl font-bold text-primary-600">
                            {formatCurrency(
                              order.vendorAmount || order.amounts?.total || 0
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions for Pending Orders */}
                    {order.status === "pending" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col gap-3 flex-shrink-0"
                      >
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => acceptOrder(order._id)}
                          leftIcon={<CheckCircle className="w-4 h-4" />}
                          className="w-full"
                        >
                          Accept Order
                        </Button>
                        <Button
                          variant="danger"
                          size="md"
                          onClick={() => rejectOrder(order._id)}
                          leftIcon={<XCircle className="w-4 h-4" />}
                          className="w-full"
                        >
                          Reject Order
                        </Button>
                      </motion.div>
                    )}
                  </div>

                  {/* Latest Update */}
                  {order.trackingInfo?.updates?.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <div className="flex items-start gap-2 text-sm text-neutral-600">
                        <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Latest Update: </span>
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
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
