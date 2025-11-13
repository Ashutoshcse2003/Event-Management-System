import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Shield, Store, LogIn, Sparkles } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const roles = [
    {
      value: "user",
      label: "User",
      icon: User,
      description: "Browse and order event services",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "vendor",
      label: "Vendor",
      icon: Store,
      description: "Manage products and orders",
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "admin",
      label: "Admin",
      icon: Shield,
      description: "Manage users and vendors",
      color: "from-orange-500 to-red-500",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = {
        name: name.trim(),
        email: email || `${name.toLowerCase().replace(/\s+/g, "")}@example.com`,
        role,
      };

      login(user);
      toast.success(`Welcome back, ${name}!`);

      // Redirect based on role
      if (role === "admin") navigate("/admin");
      else if (role === "vendor") navigate("/vendor");
      else navigate("/");

      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-white py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-2xl mb-4"
          >
            <LogIn className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-heading font-bold text-gradient mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-600">Sign in to continue to EventHub</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
              fullWidth
            />

            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              helperText="Optional for demo"
              fullWidth
            />

            {/* Role Selection */}
            <div>
              <label className="block mb-3 font-medium text-sm text-neutral-700">
                Select Role
              </label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((roleOption, index) => (
                  <motion.div
                    key={roleOption.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <button
                      type="button"
                      onClick={() => setRole(roleOption.value)}
                      className={`
                        w-full p-4 rounded-xl border-2 transition-all text-left
                        ${
                          role === roleOption.value
                            ? "border-primary-500 bg-primary-50 shadow-md"
                            : "border-neutral-200 bg-white hover:border-neutral-300"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                          w-12 h-12 rounded-lg flex items-center justify-center
                          bg-gradient-to-br ${roleOption.color}
                        `}
                        >
                          <roleOption.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 mb-1">
                            {roleOption.label}
                          </h3>
                          <p className="text-sm text-neutral-600">
                            {roleOption.description}
                          </p>
                        </div>
                        {role === roleOption.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                          >
                            <Sparkles className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Demo Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 bg-info-light rounded-lg border border-info/20"
          >
            <p className="text-sm text-info-dark text-center">
              🎭 This is a demo. No password required!
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
