import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import Button from "../components/Button";

export default function AdminSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    category: "Admin",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const categories = ["Catering", "Florist", "Decoration", "Lighting"];

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
        role: "admin",
      };

      login(user);
      toast.success(`Welcome Admin, ${formData.name}!`);
      navigate("/admin");
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
          onClick={() => navigate("/login/admin")}
          className="mb-6 flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to login</span>
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6 text-white">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Shield className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Event Management System</h1>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <div className="grid grid-cols-[100px_1fr] gap-3">
                  <label className="px-3 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-lg text-center flex items-center justify-center">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Vendor"
                    className="px-4 py-2.5 bg-sky-100 border border-sky-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="grid grid-cols-[100px_1fr] gap-3">
                  <label className="px-3 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-lg text-center flex items-center justify-center">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Vendor"
                    className="px-4 py-2.5 bg-sky-100 border border-sky-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="grid grid-cols-[100px_1fr] gap-3">
                  <label className="px-3 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-lg text-center flex items-center justify-center">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Vendor"
                    className="px-4 py-2.5 bg-sky-100 border border-sky-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <div className="grid grid-cols-[100px_1fr] gap-3">
                  <label className="px-3 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-lg text-center flex items-center justify-center">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="px-4 py-2.5 bg-sky-100 border border-sky-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                  >
                    <option value="Admin">Employee</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sign Up Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
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

        {/* Category Info */}
        <div className="mt-4 p-4 bg-white rounded-lg border border-neutral-200">
          <p className="text-sm text-neutral-600 text-center">
            Admin categories
          </p>
          <div className="mt-2 flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full"
              >
                * {cat}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
