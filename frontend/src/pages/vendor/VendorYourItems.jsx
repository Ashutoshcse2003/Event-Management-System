import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Package, Search } from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useToast } from "../../contexts/ToastContext";

export default function VendorYourItems() {
  const toast = useToast();
  const [items, setItems] = useState([
    {
      id: "p1",
      name: "Wedding Buffet Package",
      qty: 10,
      price: 2500,
      category: "Catering",
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?w=280&h=192&fit=crop",
    },
    {
      id: "p2",
      name: "Corporate Lunch Box",
      qty: 50,
      price: 850,
      category: "Catering",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=280&h=192&fit=crop",
    },
    {
      id: "p3",
      name: "Birthday Party Special",
      qty: 15,
      price: 1200,
      category: "Catering",
      image:
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=280&h=192&fit=crop",
    },
  ]);
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  function add() {
    if (!name.trim()) {
      toast.warning("Please enter a product name");
      return;
    }
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        name,
        qty: 1,
        price: 0,
        category: "Catering",
        image:
          "https://images.unsplash.com/photo-1555244162-803834f70033?w=280&h=192&fit=crop",
      },
    ]);
    setName("");
    toast.success(`✨ ${name} added successfully!`);
  }

  function remove(id) {
    const item = items.find((i) => i.id === id);
    setItems(items.filter((i) => i.id !== id));
    toast.success(`${item?.name || "Item"} removed`);
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Your Products 🎂
          </h1>
          <p className="text-neutral-600">Manage your service catalog</p>
        </motion.div>

        {/* Add New Product Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6"
        >
          <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">
            Quick Add Product
          </h2>
          <div className="flex gap-3">
            <Input
              placeholder="Product name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && add()}
              leftIcon={<Package className="w-4 h-4" />}
              fullWidth
            />
            <Button
              variant="primary"
              onClick={add}
              leftIcon={<Plus className="w-5 h-5" />}
            >
              Add
            </Button>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            fullWidth
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {[
            {
              label: "Total Products",
              value: items.length,
              color: "from-primary-500 to-secondary-400",
            },
            {
              label: "Total Stock",
              value: items.reduce((s, i) => s + i.qty, 0),
              color: "from-success to-success-dark",
            },
            {
              label: "Total Value",
              value: `₹${items
                .reduce((s, i) => s + i.price * i.qty, 0)
                .toLocaleString()}`,
              color: "from-purple-500 to-pink-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ y: -4 }}
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

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No products found
              </h3>
              <p className="text-neutral-600 mb-6">
                {searchQuery
                  ? "Try a different search term"
                  : "Add your first product to get started"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-all"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-neutral-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-primary-500 text-white">
                        {item.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-2">
                        {item.name}
                      </h3>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-gradient">
                            ₹{item.price}
                          </p>
                          <p className="text-xs text-neutral-500">
                            Stock: {item.qty} units
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => remove(item.id)}
                        leftIcon={<Trash2 className="w-4 h-4" />}
                        fullWidth
                      >
                        Delete
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
