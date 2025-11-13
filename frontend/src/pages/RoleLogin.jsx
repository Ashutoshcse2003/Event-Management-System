import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Store, Shield, Lock, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import Button from "../components/Button";
import Input from "../components/Input";

export default function RoleLogin() {
  const { role } = useParams(); // user, vendor, admin
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const roleConfig = {
    user: {
      title: "User Login",
      icon: User,
      color: "from-blue-500 to-cyan-500",
      placeholder: "User",
      signupPath: "/signup/user",
    },
    vendor: {
      title: "Vendor Login",
      icon: Store,
      color: "from-purple-500 to-pink-500",
      placeholder: "Vendor",
      signupPath: "/signup/vendor",
    },
    admin: {
      title: "Admin Login",
      icon: Shield,
      color: "from-orange-500 to-red-500",
      placeholder: "Admin",
      signupPath: null, // No signup for admin
    },
  };

  const config = roleConfig[role] || roleConfig.user;
  const IconComponent = config.icon;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId.trim()) {
      toast.error("Please enter your User ID");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter your password");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = {
        name: userId.trim(),
        email: `${userId.toLowerCase()}@example.com`,
        role,
      };

      login(user);
      toast.success(`Welcome back, ${userId}!`);

      // Redirect based on role
      if (role === "admin") navigate("/admin");
      else if (role === "vendor") navigate("/vendor");
      else navigate("/dashboard");

      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-white py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="mb-6 flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to role selection</span>
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
          {/* Header */}
          <div
            className={`bg-gradient-to-r ${config.color} px-8 py-6 text-white`}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <IconComponent className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Event Management System</h1>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User ID */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  User Id
                </label>
                <div className="grid grid-cols-[120px_1fr] gap-3">
                  <input
                    type="text"
                    value="User Id"
                    disabled
                    className="px-4 py-3 bg-primary-500 text-white font-medium rounded-lg text-center"
                  />
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder={config.placeholder}
                    className="px-4 py-3 bg-sky-100 border border-sky-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="grid grid-cols-[120px_1fr] gap-3">
                  <input
                    type="text"
                    value="Password"
                    disabled
                    className="px-4 py-3 bg-primary-500 text-white font-medium rounded-lg text-center"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={config.placeholder}
                    className="px-4 py-3 bg-sky-100 border border-sky-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate("/login")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  disabled={loading}
                >
                  Login
                </Button>
              </div>
            </form>

            {/* Signup Link */}
            {config.signupPath && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate(config.signupPath)}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Don't have an account? Sign Up →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Chart Link */}
        {role === "vendor" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex justify-between px-4"
          >
            <button
              onClick={() => navigate("/chart")}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Chart
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Back
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
