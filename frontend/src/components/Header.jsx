import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Settings,
  Package,
  Calendar,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import Button from "./Button";

export default function Header() {
  const { user, logout: contextLogout, isAdmin, isVendor } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const cartCount = getCartCount();

  const handleLogout = () => {
    contextLogout();
    setUserMenuOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  // Navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      { path: "/", label: "Home" },
      { path: "/vendors", label: "Vendors" },
    ];

    if (user) {
      if (isAdmin) {
        return [
          ...baseItems,
          { path: "/admin", label: "Admin Panel" },
          { path: "/admin/maintenance", label: "Maintenance" },
        ];
      } else if (isVendor) {
        return [
          ...baseItems,
          { path: "/vendor", label: "Dashboard" },
          { path: "/vendor/your-items", label: "My Items" },
          { path: "/vendor/transactions", label: "Orders" },
        ];
      } else {
        return [
          ...baseItems,
          { path: "/events", label: "Events" },
          { path: "/dashboard", label: "Dashboard" },
        ];
      }
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <header className="sticky top-0 z-[1020] bg-white border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-xl">
                E
              </span>
            </div>
            <span className="font-heading font-bold text-xl text-gradient group-hover:scale-105 transition-transform">
              EventHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-4 py-2 rounded-lg font-medium text-sm transition-all
                  ${
                    isActive(item.path)
                      ? "bg-primary-50 text-primary-600"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Icon (only for non-admin, non-vendor users) */}
            {user && !isAdmin && !isVendor && (
              <Link
                to="/cart"
                className="relative p-2 hover:bg-neutral-50 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-neutral-600" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            )}

            {/* User Menu or Login Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-neutral-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-neutral-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-neutral-500 capitalize">
                      {user.role}
                    </p>
                  </div>
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 z-20"
                      >
                        <div className="px-4 py-3 border-b border-neutral-100">
                          <p className="text-sm font-medium text-neutral-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {user.email}
                          </p>
                        </div>

                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>

                        {isVendor && (
                          <Link
                            to="/vendor/your-items"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Package className="w-4 h-4" />
                            My Products
                          </Link>
                        )}

                        <Link
                          to="/order-status"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Calendar className="w-4 h-4" />
                          Orders
                        </Link>

                        <div className="border-t border-neutral-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-error-light w-full transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-neutral-50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-600" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-neutral-200"
            >
              <nav className="py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      block px-4 py-2 rounded-lg font-medium text-sm transition-all
                      ${
                        isActive(item.path)
                          ? "bg-primary-50 text-primary-600"
                          : "text-neutral-600 hover:bg-neutral-50"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
