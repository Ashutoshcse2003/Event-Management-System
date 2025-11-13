import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  Search,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

export default function ManageUsers() {
  const toast = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    {
      id: "u1",
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      role: "user",
      status: "active",
      joinDate: "2024-01-15",
      orders: 12,
    },
    {
      id: "u2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543211",
      role: "user",
      status: "active",
      joinDate: "2024-01-10",
      orders: 8,
    },
    {
      id: "u3",
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "9876543212",
      role: "user",
      status: "inactive",
      joinDate: "2024-01-05",
      orders: 3,
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (user) => {
    setUsers(users.filter((u) => u.id !== user.id));
    toast.success(`User ${user.name} deleted`);
  };

  const handleToggleStatus = (user) => {
    setUsers(
      users.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
    toast.success(`User status updated`);
  };

  const handleAddUser = () => {
    toast.info("Add user functionality coming soon!");
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
              Manage Users 👥
            </h1>
            <p className="text-neutral-600">View and manage user accounts</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={handleAddUser}
            leftIcon={<UserPlus className="w-5 h-5" />}
          >
            Add New User
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
              label: "Total Users",
              value: users.length,
              color: "from-primary-500 to-secondary-400",
            },
            {
              label: "Active",
              value: users.filter((u) => u.status === "active").length,
              color: "from-success to-success-dark",
            },
            {
              label: "Inactive",
              value: users.filter((u) => u.status === "inactive").length,
              color: "from-error to-error-dark",
            },
            {
              label: "Total Orders",
              value: users.reduce((sum, u) => sum + u.orders, 0),
              color: "from-purple-500 to-pink-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-neutral-200 p-5"
            >
              <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
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
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            fullWidth
          />
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">
                    Name
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">
                    Contact
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">
                    Join Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">
                    Orders
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-400 flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900">
                              {user.name}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {user.role}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-neutral-600">
                            <Mail className="w-3 h-3" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-600">
                            <Phone className="w-3 h-3" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <Calendar className="w-4 h-4" />
                          <span>{user.joinDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-neutral-900">
                          {user.orders}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleStatus(user)}
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                            user.status === "active"
                              ? "bg-success text-white"
                              : "bg-neutral-400 text-white"
                          }`}
                        >
                          {user.status === "active" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {user.status}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              toast.info("Edit user functionality coming soon!")
                            }
                            className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 text-primary-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(user)}
                            className="p-2 hover:bg-error-light rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-error" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600">No users found</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
