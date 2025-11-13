import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
} from "lucide-react";
import { getEvents, getParticipants } from "../api";
import { StatCard } from "../components/Card";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    getEvents()
      .then((list) => {
        if (mounted) setEvents(list);
        if (list.length) return getParticipants(list[0].id);
      })
      .then((p) => {
        if (mounted && p) setParticipants(p.participants || []);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const stats = [
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Total Orders",
      value: "24",
      change: "+12%",
      changeType: "positive",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Events Attended",
      value: events.length.toString(),
      change: "+3",
      changeType: "positive",
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Active Bookings",
      value: "8",
      change: "+2",
      changeType: "positive",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Total Spent",
      value: "$2,450",
      change: "+18%",
      changeType: "positive",
    },
  ];

  const recentOrders = [
    {
      id: 1,
      vendor: "Delicious Catering",
      service: "Wedding Catering",
      status: "Confirmed",
      date: "2025-11-20",
      amount: "$850",
    },
    {
      id: 2,
      vendor: "Bloom Florist",
      service: "Flower Decoration",
      status: "Pending",
      date: "2025-11-22",
      amount: "$320",
    },
    {
      id: 3,
      vendor: "Light Masters",
      service: "Event Lighting",
      status: "Confirmed",
      date: "2025-11-25",
      amount: "$550",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

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
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-neutral-600">
            Here's what's happening with your events today
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-neutral-900">
                Recent Orders
              </h2>
              <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg border border-neutral-200 hover:border-primary-200 hover:bg-primary-50/30 transition-all"
                >
                  <div
                    className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${
                      order.status === "Confirmed"
                        ? "bg-success-light"
                        : "bg-warning-light"
                    }
                  `}
                  >
                    {order.status === "Confirmed" ? (
                      <CheckCircle className="w-6 h-6 text-success" />
                    ) : (
                      <Clock className="w-6 h-6 text-warning" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      {order.vendor}
                    </h3>
                    <p className="text-sm text-neutral-600">{order.service}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-neutral-900 mb-1">
                      {order.amount}
                    </p>
                    <p className="text-xs text-neutral-500">{order.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
          >
            <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-6">
              Quick Actions
            </h2>

            <div className="space-y-3">
              {[
                {
                  icon: ShoppingBag,
                  label: "Browse Vendors",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Calendar,
                  label: "Book Service",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: Users,
                  label: "View Events",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Package,
                  label: "Track Orders",
                  color: "from-orange-500 to-red-500",
                },
              ].map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-primary-200 hover:bg-primary-50/30 transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}
                  >
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-neutral-900">
                    {action.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Participants Section */}
        {participants.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
          >
            <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
              Event Participants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {participants.map((p, index) => (
                <motion.div
                  key={p.participantId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {p.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 truncate">
                      {p.name}
                    </p>
                    <p className="text-sm text-neutral-600 truncate">
                      {p.email}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
