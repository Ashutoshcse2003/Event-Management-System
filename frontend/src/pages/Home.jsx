import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  ShoppingBag,
  Star,
  ChefHat,
  Flower2,
  Lightbulb,
  Camera,
  ArrowRight,
} from "lucide-react";
import Button from "../components/Button";
import { StatCard } from "../components/Card";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const categories = [
    {
      id: 1,
      name: "Catering",
      icon: ChefHat,
      description: "Delicious food for your events",
      color: "from-orange-500 to-red-500",
      vendorCount: 45,
    },
    {
      id: 2,
      name: "Florist",
      icon: Flower2,
      description: "Beautiful flower arrangements",
      color: "from-pink-500 to-purple-500",
      vendorCount: 32,
    },
    {
      id: 3,
      name: "Decoration",
      icon: Sparkles,
      description: "Transform your venue",
      color: "from-blue-500 to-cyan-500",
      vendorCount: 38,
    },
    {
      id: 4,
      name: "Lighting",
      icon: Lightbulb,
      description: "Set the perfect ambiance",
      color: "from-yellow-500 to-orange-500",
      vendorCount: 28,
    },
    {
      id: 5,
      name: "Photography",
      icon: Camera,
      description: "Capture your special moments",
      color: "from-indigo-500 to-purple-500",
      vendorCount: 52,
    },
  ];

  const stats = [
    { label: "Active Vendors", value: "500+", icon: Users },
    { label: "Happy Clients", value: "10K+", icon: Star },
    { label: "Services Offered", value: "50+", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-white py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-6xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4 px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium"
          >
            🎉 Your One-Stop Event Solution Platform
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-heading font-bold text-gradient mb-6">
            Make Every Event
            <br />
            Extraordinary
          </h1>

          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Connect with top-rated vendors for catering, decoration,
            photography, and more. Everything you need to create unforgettable
            memories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => navigate("/vendors")}
            >
              Explore Vendors
            </Button>
            {!user && (
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Get Started
              </Button>
            )}
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-200 rounded-full blur-3xl opacity-50" />
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatCard
                  icon={<stat.icon className="w-6 h-6" />}
                  title={stat.label}
                  value={stat.value}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-neutral-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-neutral-600">
              Find the perfect vendors for every aspect of your event
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() =>
                  navigate(`/vendors?category=${category.name.toLowerCase()}`)
                }
                className="cursor-pointer group"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 overflow-hidden">
                  {/* Gradient background */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {category.description}
                  </p>

                  {/* Vendor count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500">
                      {category.vendorCount} vendors
                    </span>
                    <ArrowRight className="w-5 h-5 text-primary-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-500 to-secondary-400">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl text-center"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Ready to Plan Your Event?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of happy clients who found their perfect vendors
            through our platform
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/vendors")}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Start Exploring
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
