import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import Button from "../../components/Button";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();
  const toast = useToast();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
    toast.success(`${item.name} removed from cart`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
            Shopping Cart 🛒
          </h1>
          <p className="text-neutral-600">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center"
          >
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-neutral-400" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-neutral-600 mb-6">
              Start adding services to your cart to book your event!
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/vendors")}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Browse Services
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8 text-neutral-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-1 truncate">
                          {item.name}
                        </h3>
                        {item.vendor && (
                          <p className="text-sm text-neutral-600 mb-3">
                            by {item.vendor}
                          </p>
                        )}

                        <div className="flex items-center gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 rounded-lg border border-neutral-300 flex items-center justify-center hover:border-primary-500 hover:bg-primary-50 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-neutral-700" />
                            </motion.button>
                            <span className="w-12 text-center font-semibold text-neutral-900">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded-lg border border-neutral-300 flex items-center justify-center hover:border-primary-500 hover:bg-primary-50 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-neutral-700" />
                            </motion.button>
                          </div>

                          {/* Price */}
                          <div className="flex-1 text-right">
                            <p className="font-bold text-xl text-gradient">
                              ₹{item.price * item.quantity}
                            </p>
                            <p className="text-sm text-neutral-500">
                              ₹{item.price} each
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveItem(item)}
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-error hover:bg-error-light transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Service Fee</span>
                    <span className="font-medium">
                      ₹{Math.round(getCartTotal() * 0.05)}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>GST (18%)</span>
                    <span className="font-medium">
                      ₹{Math.round(getCartTotal() * 0.18)}
                    </span>
                  </div>
                  <div className="border-t border-neutral-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-neutral-900 text-lg">
                        Total
                      </span>
                      <span className="font-bold text-2xl text-gradient">
                        ₹{Math.round(getCartTotal() * 1.23)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleCheckout}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="mb-3"
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="ghost"
                  size="md"
                  fullWidth
                  onClick={() => navigate("/vendors")}
                >
                  Continue Shopping
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
