import React, { useState } from "react";
import { motion } from "framer-motion";
import { Package, Save, X } from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

export default function VendorAddNewItem() {
  const toast = useToast();
  const navigate = useNavigate();
  const [status, setStatus] = useState("draft");
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!product.trim()) {
      toast.warning("Please enter a product name");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("✨ Product added: " + product + " (" + status + ")");
      setProduct("");
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
            Add New Product ✨
          </h1>
          <p className="text-neutral-600">
            Create a new service or product listing
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={submit}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8"
        >
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Product Name *
              </label>
              <Input
                placeholder="e.g., Wedding Buffet Package"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                leftIcon={<Package className="w-4 h-4" />}
                fullWidth
                required
              />
            </div>

            {/* Product Status */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Product Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="requested">Request Item</option>
              </select>
              <p className="text-xs text-neutral-500 mt-2">
                {status === "draft" && "Save as draft to edit later"}
                {status === "published" && "Make product visible to customers"}
                {status === "requested" && "Submit for admin approval"}
              </p>
            </div>

            {/* Status Badge Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
            >
              <p className="text-sm text-neutral-600 mb-2">Preview:</p>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    status === "published"
                      ? "bg-success text-white"
                      : status === "draft"
                      ? "bg-neutral-400 text-white"
                      : "bg-warning text-white"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                <span className="text-neutral-700 font-medium">
                  {product || "Your Product"}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-neutral-200">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => navigate("/vendor/your-items")}
              leftIcon={<X className="w-5 h-5" />}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              leftIcon={<Save className="w-5 h-5" />}
              className="flex-1"
            >
              Add Product
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
