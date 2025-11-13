import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  Home as HomeIcon,
  Building2,
  ArrowLeft,
  CheckCircle,
  Smartphone,
} from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../contexts/ToastContext";
import { useAuth } from "../../contexts/AuthContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    paymentMethod: "upi",
  });

  const subtotal = getCartTotal();
  const serviceFee = Math.round(subtotal * 0.05);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + serviceFee + gst;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (cart.length === 0) {
      toast.warning("Your cart is empty!");
      navigate("/vendors");
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderId = `ORD${Date.now()}`;
      const orderData = {
        orderId,
        items: cart,
        customerInfo: formData,
        amounts: { subtotal, serviceFee, gst, total },
        date: new Date().toISOString(),
        status: "confirmed",
      };

      // Store order data in sessionStorage for the success page
      sessionStorage.setItem("lastOrder", JSON.stringify(orderData));

      clearCart();
      setLoading(false);
      navigate("/order-success");
      toast.success("Order placed successfully! 🎉");
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🛒</span>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            Your cart is empty
          </h3>
          <Button variant="primary" onClick={() => navigate("/vendors")}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/cart")}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="mb-4"
          >
            Back to Cart
          </Button>
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
            Checkout 💳
          </h1>
          <p className="text-neutral-600">Complete your order details</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Details Section */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                  Order Items
                </h2>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-neutral-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-neutral-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-neutral-900">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Details Section */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                  Customer Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      leftIcon={<User className="w-4 h-4" />}
                      fullWidth
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      leftIcon={<Phone className="w-4 h-4" />}
                      fullWidth
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      leftIcon={<Mail className="w-4 h-4" />}
                      fullWidth
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address Section */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                  Delivery Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Address *
                    </label>
                    <Input
                      placeholder="Street address, building, apartment"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      leftIcon={<HomeIcon className="w-4 h-4" />}
                      fullWidth
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        City *
                      </label>
                      <Input
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        leftIcon={<Building2 className="w-4 h-4" />}
                        fullWidth
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        State *
                      </label>
                      <Input
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        leftIcon={<MapPin className="w-4 h-4" />}
                        fullWidth
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Pin Code *
                    </label>
                    <Input
                      placeholder="123456"
                      value={formData.pinCode}
                      onChange={(e) =>
                        setFormData({ ...formData, pinCode: e.target.value })
                      }
                      leftIcon={<MapPin className="w-4 h-4" />}
                      fullWidth
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { value: "upi", label: "UPI", icon: Smartphone },
                    {
                      value: "cash",
                      label: "Cash on Delivery",
                      icon: CreditCard,
                    },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === method.value
                          ? "border-primary-500 bg-primary-50"
                          : "border-neutral-200 hover:border-primary-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentMethod: e.target.value,
                          })
                        }
                        className="w-4 h-4 text-primary-500"
                      />
                      <method.icon className="w-5 h-5 text-neutral-600" />
                      <span className="font-medium text-neutral-900">
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </motion.div>

          {/* Order Summary Sidebar */}
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
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Service Fee</span>
                  <span className="font-medium">₹{serviceFee}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>GST (18%)</span>
                  <span className="font-medium">₹{gst}</span>
                </div>
                <div className="border-t border-neutral-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-neutral-900 text-lg">
                      Total
                    </span>
                    <span className="font-bold text-2xl text-gradient">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                onClick={handleSubmit}
                leftIcon={<CheckCircle className="w-5 h-5" />}
              >
                Place Order
              </Button>

              <p className="text-xs text-neutral-500 text-center mt-4">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
