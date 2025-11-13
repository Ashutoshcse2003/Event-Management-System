import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Store, Shield, ArrowRight } from "lucide-react";
import Button from "../components/Button";

export default function LoginSelection() {
  const navigate = useNavigate();

  const loginOptions = [
    {
      role: "user",
      title: "User Login",
      icon: User,
      description: "Browse products and place orders",
      color: "from-blue-500 to-cyan-500",
      path: "/login/user",
    },
    {
      role: "vendor",
      title: "Vendor Login",
      icon: Store,
      description: "Manage your products and orders",
      color: "from-purple-500 to-pink-500",
      path: "/login/vendor",
    },
    {
      role: "admin",
      title: "Admin Login",
      icon: Shield,
      description: "System administration and management",
      color: "from-orange-500 to-red-500",
      path: "/login/admin",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-white py-12 px-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
            Event Management System
          </h1>
          <p className="text-xl text-neutral-600">
            Select your role to continue
          </p>
        </motion.div>

        {/* Login Options */}
        <div className="grid md:grid-cols-3 gap-6">
          {loginOptions.map((option, index) => (
            <motion.div
              key={option.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(option.path)}
              className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 cursor-pointer hover:shadow-xl transition-all group"
            >
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center transform group-hover:scale-110 transition-transform`}
              >
                <option.icon className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 text-center mb-3">
                {option.title}
              </h3>

              <p className="text-neutral-600 text-center mb-6">
                {option.description}
              </p>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Chart Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => navigate("/chart")}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View System Flow Chart →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
