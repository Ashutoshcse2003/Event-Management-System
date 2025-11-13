import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Users,
  Store,
  CreditCard,
  Settings,
  Database,
  Lock,
  AlertCircle,
} from "lucide-react";
import Button from "../components/Button";
import { useToast } from "../contexts/ToastContext";

export default function AdminMaintenance() {
  const toast = useToast();
  const navigate = useNavigate();

  const managementCards = [
    {
      title: "Membership Management",
      icon: CreditCard,
      color: "from-purple-500 to-pink-500",
      description:
        "Add, update, and manage vendor memberships and subscription plans",
      actions: ["Add Membership", "Update Plans", "View Active"],
    },
    {
      title: "User Management",
      icon: Users,
      color: "from-primary-500 to-secondary-400",
      description:
        "Manage user accounts, roles, and permissions across the platform",
      actions: ["View All Users", "Edit Roles", "User Reports"],
      route: "/admin/manage-users",
    },
    {
      title: "Vendor Management",
      icon: Store,
      color: "from-success to-success-dark",
      description:
        "Oversee vendor accounts, approvals, and business operations",
      actions: ["View All Vendors", "Approve Pending", "Vendor Reports"],
      route: "/admin/manage-vendors",
    },
    {
      title: "System Settings",
      icon: Settings,
      color: "from-warning to-warning-dark",
      description:
        "Configure platform settings, features, and system preferences",
      actions: ["General Settings", "Email Config", "Security"],
    },
    {
      title: "Database Management",
      icon: Database,
      color: "from-blue-500 to-cyan-500",
      description: "Manage database backups, migrations, and data integrity",
      actions: ["Backup Now", "View Logs", "Restore"],
    },
    {
      title: "Security & Access",
      icon: Lock,
      color: "from-error to-error-dark",
      description:
        "Monitor security, manage API keys, and control access levels",
      actions: ["View Logs", "API Keys", "Permissions"],
    },
  ];

  const handleAction = (card, action, route) => {
    if (route && action === card.actions[0]) {
      navigate(route);
    } else {
      toast.info(`${action} - ${card.title} (Coming soon)`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-error to-error-dark flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-neutral-900">
                System Maintenance
              </h1>
              <p className="text-neutral-600">
                Admin-only access • Manage platform operations
              </p>
            </div>
          </div>
        </motion.div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-warning-light border-l-4 border-warning rounded-lg p-4 mb-8 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-warning-dark mb-1">
              Restricted Access Area
            </h3>
            <p className="text-sm text-neutral-700">
              This section contains sensitive system management tools. Changes
              made here affect the entire platform. Please proceed with caution.
            </p>
          </div>
        </motion.div>

        {/* Management Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {managementCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-xl transition-all"
            >
              {/* Icon Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}
                >
                  <card.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-lg text-neutral-900 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                {card.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-2">
                {card.actions.map((action, idx) => (
                  <Button
                    key={action}
                    variant={idx === 0 ? "primary" : "ghost"}
                    size="sm"
                    fullWidth
                    onClick={() => handleAction(card, action, card.route)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
        >
          <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
            System Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Users", value: "2,543" },
              { label: "Total Vendors", value: "156" },
              { label: "Active Memberships", value: "142" },
              { label: "System Health", value: "98%" },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className="text-center p-4 bg-neutral-50 rounded-lg"
              >
                <p className="text-2xl font-bold text-gradient mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-neutral-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
