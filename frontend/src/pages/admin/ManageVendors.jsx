import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  UserPlus,
  Edit,
  Trash2,
  Search,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Package,
  TrendingUp,
  Clock,
} from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

export default function ManageVendors() {
  const toast = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [vendors, setVendors] = useState([
    {
      id: "v1",
      name: "TechWorld Electronics",
      email: "contact@techworld.com",
      phone: "9876543210",
      category: "Electronics",
      status: "active",
      joinDate: "2024-01-15",
      products: 42,
      revenue: 125000,
    },
    {
      id: "v2",
      name: "Fashion Hub",
      email: "info@fashionhub.com",
      phone: "9876543211",
      category: "Fashion",
      status: "active",
      joinDate: "2024-01-10",
      products: 156,
      revenue: 89000,
    },
    {
      id: "v3",
      name: "HomeComfort Store",
      email: "support@homecomfort.com",
      phone: "9876543212",
      category: "Home & Kitchen",
      status: "pending",
      joinDate: "2024-01-20",
      products: 28,
      revenue: 34000,
    },
  ]);

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (vendor) => {
    setVendors(vendors.filter((v) => v.id !== vendor.id));
    toast.success(`Vendor ${vendor.name} deleted`);
  };

  const handleToggleStatus = (vendor) => {
    const newStatus =
      vendor.status === "active"
        ? "inactive"
        : vendor.status === "pending"
        ? "active"
        : "active";
    setVendors(
      vendors.map((v) => (v.id === vendor.id ? { ...v, status: newStatus } : v))
    );
    toast.success(`Vendor status updated to ${newStatus}`);
  };

  const handleAddVendor = () => {
    toast.info("Add vendor functionality coming soon!");
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
              Manage Vendors 🏪
            </h1>
            <p className="text-neutral-600">View and manage vendor accounts</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={handleAddVendor}
            leftIcon={<UserPlus className="w-5 h-5" />}
          >
            Add New Vendor
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              label: "Total Vendors",
              value: vendors.length,
              color: "from-primary-500 to-secondary-400",
              icon: Store,
            },
            {
              label: "Active",
              value: vendors.filter((v) => v.status === "active").length,
              color: "from-success to-success-dark",
              icon: CheckCircle,
            },
            {
              label: "Pending Approval",
              value: vendors.filter((v) => v.status === "pending").length,
              color: "from-warning to-warning-dark",
              icon: Clock,
            },
            {
              label: "Total Revenue",
              value: `₹${(
                vendors.reduce((sum, v) => sum + v.revenue, 0) / 1000
              ).toFixed(0)}K`,
              color: "from-purple-500 to-pink-500",
              icon: TrendingUp,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-neutral-200 p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">{stat.label}</p>
                <stat.icon className="w-5 h-5 text-neutral-400" />
              </div>
              <p
                className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Input
            placeholder="Search vendors by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            fullWidth
          />
        </motion.div>

        {/* Vendors Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredVendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 flex items-center justify-center">
                      <Store className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-neutral-900">
                        {vendor.name}
                      </h3>
                      <p className="text-xs text-neutral-500">
                        {vendor.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{vendor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Phone className="w-4 h-4" />
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {vendor.joinDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">Products</p>
                    <p className="text-lg font-bold text-neutral-900">
                      {vendor.products}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">Revenue</p>
                    <p className="text-lg font-bold text-gradient">
                      ₹{(vendor.revenue / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => handleToggleStatus(vendor)}
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                      vendor.status === "active"
                        ? "bg-success text-white"
                        : vendor.status === "pending"
                        ? "bg-warning text-white"
                        : "bg-neutral-400 text-white"
                    }`}
                  >
                    {vendor.status === "active" ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : vendor.status === "pending" ? (
                      <Clock className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    {vendor.status}
                  </button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      toast.info("Edit vendor functionality coming soon!")
                    }
                    leftIcon={<Edit className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(vendor)}
                    leftIcon={<Trash2 className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredVendors.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
            <Store className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <p className="text-neutral-600">No vendors found</p>
          </div>
        )}
      </div>
    </div>
  );
}
