import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Plus,
  Eye,
  CreditCard,
  Users,
  Star,
  Activity,
} from "lucide-react";
import { StatCard } from "../components/Card";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

export default function VendorMain() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Total Products",
      value: "42",
      change: "+5",
      changeType: "positive",
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "Pending Orders",
      value: "18",
      change: "+3",
      changeType: "positive",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Revenue (Month)",
      value: "$12,450",
      change: "+23%",
      changeType: "positive",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Rating",
      value: "4.8",
      change: "+0.2",
      changeType: "positive",
    },
  ];

  const quickActions = [
    {
      icon: Eye,
      label: "View Your Items",
      description: "Manage your product catalog",
      path: "/vendor/your-items",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Plus,
      label: "Add New Item",
      description: "List a new product or service",
      path: "/vendor/add-new",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: CreditCard,
      label: "View Transactions",
      description: "Check orders and payments",
      path: "/vendor/transactions",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New order received",
      customer: "John Doe",
      time: "2 min ago",
      type: "order",
    },
    {
      id: 2,
      action: "Product updated",
      item: "Wedding Cake Special",
      time: "1 hour ago",
      type: "update",
    },
    {
      id: 3,
      action: "Payment received",
      amount: "$450",
      time: "3 hours ago",
      type: "payment",
    },
    {
      id: 4,
      action: "New review",
      rating: "5 stars",
      time: "5 hours ago",
      type: "review",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
            Vendor Dashboard 🏪
          </h1>
          <p className="text-neutral-600">
            Welcome back, {user?.name}! Here's your store overview
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(action.path)}
                className="group bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-xl transition-all text-left"
              >
                <div
                  className={`w-14 h-14 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-neutral-900 mb-2">
                  {action.label}
                </h3>
                <p className="text-sm text-neutral-600">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-neutral-900">
                Recent Activity
              </h2>
              <Activity className="w-5 h-5 text-neutral-400" />
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.type === "order"
                        ? "bg-blue-100"
                        : activity.type === "payment"
                        ? "bg-green-100"
                        : activity.type === "review"
                        ? "bg-yellow-100"
                        : "bg-purple-100"
                    }`}
                  >
                    {activity.type === "order" && (
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                    )}
                    {activity.type === "payment" && (
                      <DollarSign className="w-5 h-5 text-green-600" />
                    )}
                    {activity.type === "review" && (
                      <Star className="w-5 h-5 text-yellow-600" />
                    )}
                    {activity.type === "update" && (
                      <Package className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {activity.customer ||
                        activity.item ||
                        activity.amount ||
                        activity.rating}
                    </p>
                  </div>
                  <span className="text-xs text-neutral-500 whitespace-nowrap">
                    {activity.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
          >
            <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-6">
              Sales Overview
            </h2>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-primary-500 mx-auto mb-3" />
                <p className="text-neutral-600">
                  Chart visualization coming soon
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
