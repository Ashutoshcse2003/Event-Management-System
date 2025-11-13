import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import Button from "../components/Button";

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: "user",
      };

      login(user);
      toast.success(`Welcome, ${formData.name}!`);
      navigate("/dashboard");
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
          onClick={() => navigate("/login/user")}
          className="mb-6 flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to login</span>
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-6 text-white">
            <div className="flex items-center justify-center gap-3 mb-2">
              <User className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Event Management System</h1>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="flex justify-between mb-6">
              <button
                onClick={() => navigate("/chart")}
                className="px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors"
              >
                Chart
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors"
              >
                Back
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <div className="grid grid-cols-[120px_1fr] gap-3">
                  <label className="px-4 py-3 bg-primary-500 text-white font-medium rounded-lg text-center flex items-center justify-center">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="User"
                    className="px-4 py-3 bg-sky-100 border border-sky-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="grid grid-cols-[120px_1fr] gap-3">
                  <label className="px-4 py-3 bg-primary-500 text-white font-medium rounded-lg text-center flex items-center justify-center">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="User"
                    className="px-4 py-3 bg-sky-100 border border-sky-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="grid grid-cols-[120px_1fr] gap-3">
                  <label className="px-4 py-3 bg-primary-500 text-white font-medium rounded-lg text-center flex items-center justify-center">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="User"
                    className="px-4 py-3 bg-sky-100 border border-sky-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Sign Up Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={loading}
                  disabled={loading}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
