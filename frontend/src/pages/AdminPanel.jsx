import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Store,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  UserCheck,
  AlertCircle,
  Settings,
  BarChart3,
  FileText,
} from "lucide-react";
import { getEvents, getParticipants } from "../api";
import { StatCard } from "../components/Card";
import { useAuth } from "../contexts/AuthContext";

export default function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getEvents()
      .then((list) => {
        setEvents(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selected) {
      getParticipants(selected)
        .then((data) => setParticipants(data.participants || []))
        .catch(() => setParticipants([]));
    }
  }, [selected]);

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Total Users",
      value: "2,543",
      change: "+12%",
      changeType: "positive",
    },
    {
      icon: <Store className="w-6 h-6" />,
      title: "Active Vendors",
      value: "156",
      change: "+8",
      changeType: "positive",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Total Orders",
      value: "8,234",
      change: "+23%",
      changeType: "positive",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Revenue",
      value: "$156,890",
      change: "+18%",
      changeType: "positive",
    },
  ];

  const adminActions = [
    {
      icon: Users,
      label: "Manage Users",
      count: 2543,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Store,
      label: "Manage Vendors",
      count: 156,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: ShoppingBag,
      label: "Manage Products",
      count: 892,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FileText,
      label: "View Reports",
      count: 45,
      color: "from-orange-500 to-red-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
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
            Admin Dashboard 🛡️
          </h1>
          <p className="text-neutral-600">
            Welcome, {user?.name}! Manage your platform from here
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

        {/* Admin Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-xl transition-all text-left"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">
                  {action.label}
                </h3>
                <p className="text-2xl font-bold text-gradient">
                  {action.count}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Event Participants Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
        >
          <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-6">
            Event Participants Management
          </h2>

          {/* Event Selector */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-sm text-neutral-700">
              Select Event
            </label>
            <select
              onChange={(e) => setSelected(e.target.value)}
              value={selected || ""}
              className="w-full md:w-96 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            >
              <option value="">-- Choose an event --</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title}
                </option>
              ))}
            </select>
          </div>

          {/* Participants Table */}
          {participants.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="overflow-x-auto"
            >
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 font-semibold text-neutral-900">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-900">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-900">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-900">
                      Team
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p, index) => (
                    <motion.tr
                      key={p.participantId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-neutral-600">
                        {p.participantId}
                      </td>
                      <td className="py-3 px-4 font-medium text-neutral-900">
                        {p.name}
                      </td>
                      <td className="py-3 px-4 text-neutral-600">{p.email}</td>
                      <td className="py-3 px-4 text-neutral-600">
                        {p.team || "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-success-light text-success-dark rounded-full text-xs font-medium">
                          <UserCheck className="w-3 h-3" />
                          Active
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {selected && participants.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-600">
                No participants found for this event
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
