import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Download,
  Home,
  Package,
  Calendar,
  MapPin,
  CreditCard,
  User,
  Mail,
  Phone,
  ArrowRight,
  Printer,
} from "lucide-react";
import Button from "../../components/Button";
import { useToast } from "../../contexts/ToastContext";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const toast = useToast();
  const [orderData, setOrderData] = useState(null);
  const receiptRef = useRef(null);

  useEffect(() => {
    const savedOrder = sessionStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    } else {
      // If no order data, redirect to home
      navigate("/");
    }
  }, [navigate]);

  const handleDownloadReceipt = async () => {
    try {
      // Dynamically import html2canvas
      const html2canvas = (await import("html2canvas")).default;

      if (receiptRef.current) {
        const canvas = await html2canvas(receiptRef.current, {
          scale: 2,
          backgroundColor: "#ffffff",
          logging: false,
          useCORS: true,
        });

        const link = document.createElement("a");
        link.download = `Order-Receipt-${orderData.orderId}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        toast.success("Receipt downloaded as image! 📄");
      }
    } catch (error) {
      console.error("Error downloading receipt:", error);
      toast.error("Failed to download receipt");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const orderDate = new Date(orderData.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: 80mm auto;
            margin: 0;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Courier New', monospace;
          }
          
          * {
            box-shadow: none !important;
            text-shadow: none !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print-receipt {
            width: 80mm !important;
            max-width: 80mm !important;
            margin: 0 auto !important;
            padding: 8mm !important;
            background: white !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            font-family: 'Courier New', monospace !important;
            color: #000 !important;
          }
          
          .print-header {
            text-align: center;
            border-bottom: 2px dashed #000;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          
          .print-header h1 {
            font-size: 20px;
            font-weight: bold;
            margin: 0 0 6px 0;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          
          .print-header p {
            font-size: 10px;
            margin: 2px 0;
            color: #000;
            line-height: 1.4;
          }
          
          .print-section {
            margin: 12px 0;
            padding: 10px 0;
            border-bottom: 1px dashed #999;
          }
          
          .print-section:last-of-type {
            border-bottom: 2px dashed #000;
            padding-bottom: 12px;
          }
          
          .print-label {
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 6px;
            letter-spacing: 1px;
          }
          
          .print-value {
            font-size: 10px;
            margin-bottom: 2px;
            line-height: 1.4;
          }
          
          .print-items table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
          }
          
          .print-items th {
            text-align: left;
            font-size: 9px;
            font-weight: bold;
            padding: 5px 2px;
            border-bottom: 1px solid #000;
            text-transform: uppercase;
          }
          
          .print-items th:nth-child(2),
          .print-items th:nth-child(3),
          .print-items th:nth-child(4) {
            text-align: right;
          }
          
          .print-items td {
            font-size: 10px;
            padding: 8px 2px;
            border-bottom: 1px dashed #ccc;
            vertical-align: top;
          }
          
          .print-items td:nth-child(2),
          .print-items td:nth-child(3),
          .print-items td:nth-child(4) {
            text-align: right;
          }
          
          .print-items tbody tr:last-child td {
            border-bottom: 1px solid #000;
            padding-bottom: 10px;
          }
          
          .print-items .item-name {
            font-weight: bold;
            margin-bottom: 2px;
          }
          
          .print-items .item-vendor {
            font-size: 8px;
            color: #555;
            font-style: italic;
          }
          
          .print-total-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            font-size: 10px;
          }
          
          .print-grand-total {
            display: flex;
            justify-content: space-between;
            padding: 12px 0 8px 0;
            margin-top: 10px;
            border-top: 2px solid #000 !important;
            font-size: 16px !important;
            font-weight: bold;
            letter-spacing: 1px;
          }
          
          .print-grand-total span:last-child {
            font-size: 18px !important;
          }
          
          .print-footer {
            text-align: center;
            margin-top: 15px;
            padding-top: 12px;
            border-top: 2px dashed #000;
          }
          
          .print-footer p {
            font-size: 9px;
            margin: 5px 0;
            line-height: 1.5;
          }
          
          .print-barcode {
            text-align: center;
            font-family: 'Libre Barcode 128', 'Courier New', monospace;
            font-size: 40px;
            margin: 10px 0;
            letter-spacing: 3px;
            font-weight: normal;
            transform: scaleY(0.8);
          }
          
          /* Override any gradient backgrounds */
          .text-gradient,
          .bg-gradient-to-r,
          .bg-gradient-to-br {
            background: transparent !important;
            -webkit-background-clip: unset !important;
            -webkit-text-fill-color: #000 !important;
            color: #000 !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-neutral-50 py-8 px-4 print-container">
        {" "}
        <div className="container mx-auto max-w-4xl">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-success to-success-dark rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-neutral-600">
              Thank you for your order. Your order has been received and is
              being processed.
            </p>
          </motion.div>

          {/* Order Receipt */}
          <div className="print-receipt-wrapper">
            <motion.div
              ref={receiptRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden print:shadow-none print-receipt"
            >
              {/* Print Shop Header (Hidden on screen) */}
              <div className="hidden print:block print-header">
                <h1>EVENT MART</h1>
                <p>Your One-Stop Shopping Destination</p>
                <p>📍 123 Main Street, Downtown</p>
                <p>📞 +91-9876543210 | 📧 support@eventmart.com</p>
                <p>🌐 www.eventmart.com</p>
                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                >
                  TAX INVOICE / BILL OF SUPPLY / CASH MEMO
                </p>
                <p style={{ fontSize: "9px", marginTop: "4px" }}>
                  GSTIN: 29ABCDE1234F1Z5
                </p>
              </div>

              {/* Screen View Header */}
              <div className="print:hidden bg-gradient-to-r from-primary-500 to-secondary-400 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-2">
                      Order Receipt
                    </h2>
                    <p className="text-white/90">
                      Thank you for shopping with us!
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/90 mb-1">Order ID</p>
                    <p className="text-xl font-mono font-bold">
                      {orderData.orderId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="p-6 space-y-6 print:p-0 print:space-y-0">
                {/* Print Order ID & Date */}
                <div className="hidden print:block print-section">
                  <div
                    className="print-total-row"
                    style={{ fontSize: "11px", fontWeight: "bold" }}
                  >
                    <span>Order ID:</span>
                    <span>{orderData.orderId}</span>
                  </div>
                  <div className="print-total-row" style={{ fontSize: "9px" }}>
                    <span>Date:</span>
                    <span>{orderDate}</span>
                  </div>
                  <div className="print-total-row" style={{ fontSize: "9px" }}>
                    <span>Payment:</span>
                    <span>
                      {orderData.customerInfo.paymentMethod === "upi"
                        ? "UPI"
                        : "COD"}
                    </span>
                  </div>
                </div>

                {/* Order Info - Screen View */}
                <div className="print:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Customer Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-neutral-900 font-medium">
                        {orderData.customerInfo.name}
                      </p>
                      <p className="text-neutral-600 flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        {orderData.customerInfo.email}
                      </p>
                      <p className="text-neutral-600 flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        {orderData.customerInfo.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Delivery Address
                    </h3>
                    <div className="space-y-1 text-sm text-neutral-600">
                      <p>{orderData.customerInfo.address}</p>
                      <p>
                        {orderData.customerInfo.city},{" "}
                        {orderData.customerInfo.state}
                      </p>
                      <p>PIN: {orderData.customerInfo.pinCode}</p>
                    </div>
                  </div>
                </div>

                {/* Print Customer & Delivery Info */}
                <div className="hidden print:block print-section">
                  <div className="print-label">BILL TO / SHIP TO:</div>
                  <div className="print-value" style={{ fontWeight: "bold" }}>
                    {orderData.customerInfo.name}
                  </div>
                  <div className="print-value">
                    {orderData.customerInfo.phone}
                  </div>
                  <div className="print-value">
                    {orderData.customerInfo.email}
                  </div>
                  <div className="print-value" style={{ marginTop: "4px" }}>
                    {orderData.customerInfo.address}
                  </div>
                  <div className="print-value">
                    {orderData.customerInfo.city},{" "}
                    {orderData.customerInfo.state}
                  </div>
                  <div className="print-value">
                    PIN: {orderData.customerInfo.pinCode}
                  </div>
                </div>

                <div className="print:hidden border-t border-neutral-200 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Calendar className="w-4 h-4" />
                      <span>Order Date: {orderDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <CreditCard className="w-4 h-4" />
                      <span>
                        Payment:{" "}
                        {orderData.customerInfo.paymentMethod === "upi"
                          ? "UPI"
                          : "Cash on Delivery"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="print:hidden text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Order Items
                  </h3>

                  {/* Print Items Header */}
                  <div className="hidden print:block print-section">
                    <div className="print-label">ITEMS:</div>
                  </div>

                  <div className="border border-neutral-200 rounded-lg overflow-hidden print:border-none print:rounded-none">
                    <table className="w-full print-items">
                      <thead className="bg-neutral-50 print:bg-transparent">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700 print:px-0 print:py-1">
                            Product
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700 print:px-0 print:py-1">
                            Qty
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700 print:px-0 print:py-1">
                            Price
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700 print:px-0 print:py-1">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderData.items.map((item, index) => (
                          <tr
                            key={item.id}
                            className={
                              index !== orderData.items.length - 1
                                ? "border-b border-neutral-100 print:border-neutral-300"
                                : ""
                            }
                          >
                            <td className="py-3 px-4 print:px-0 print:py-2">
                              <div className="flex items-center gap-3 print:gap-0 print:flex-col print:items-start">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-lg object-cover print:hidden"
                                  />
                                )}
                                <div>
                                  <p className="font-medium text-neutral-900 item-name">
                                    {item.name}
                                  </p>
                                  {item.vendor && (
                                    <p className="text-xs text-neutral-500 item-vendor">
                                      {item.vendor}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-3 px-4 text-neutral-700 print:px-0 print:py-2">
                              {item.quantity}
                            </td>
                            <td className="text-right py-3 px-4 text-neutral-700 print:px-0 print:py-2">
                              ₹{item.price}
                            </td>
                            <td className="text-right py-3 px-4 font-semibold text-neutral-900 print:px-0 print:py-2">
                              ₹{item.price * item.quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="border-t border-neutral-200 pt-4 print:border-none print:pt-2">
                  <div className="space-y-2 max-w-xs ml-auto print:max-w-none print:ml-0">
                    <div className="flex justify-between text-neutral-600 print-total-row">
                      <span>Subtotal:</span>
                      <span className="font-medium">
                        ₹{orderData.amounts.subtotal}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-600 print-total-row">
                      <span>Service Fee:</span>
                      <span className="font-medium">
                        ₹{orderData.amounts.serviceFee}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-600 print-total-row">
                      <span>GST (18%):</span>
                      <span className="font-medium">
                        ₹{orderData.amounts.gst}
                      </span>
                    </div>
                    <div className="border-t border-neutral-200 pt-2 flex justify-between print:border-t-2 print:border-black print-grand-total">
                      <span className="font-semibold text-neutral-900 text-lg">
                        Total Amount:
                      </span>
                      <span className="font-bold text-2xl text-gradient print:text-black">
                        ₹{orderData.amounts.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Print Footer */}
                <div className="hidden print:block print-footer">
                  <div className="print-barcode">{orderData.orderId}</div>
                  <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                    Thank You for Shopping with Us!
                  </p>
                  <p>🎁 Your satisfaction is our priority</p>
                  <p>📦 Track your order at www.eventmart.com/track</p>
                  <p style={{ marginTop: "8px", fontSize: "8px" }}>
                    This is a computer-generated invoice. No signature required.
                  </p>
                  <p style={{ fontSize: "8px" }}>
                    For support: support@eventmart.com | +91-9876543210
                  </p>
                  <p style={{ fontSize: "8px", marginTop: "4px" }}>
                    Terms & Conditions apply. Visit our website for details.
                  </p>
                  <div
                    style={{
                      marginTop: "8px",
                      padding: "4px",
                      border: "1px solid #000",
                      fontSize: "8px",
                      textAlign: "left",
                    }}
                  >
                    <strong>Return Policy:</strong> Items can be returned within
                    7 days of delivery.
                    <br />
                    <strong>Warranty:</strong> As per manufacturer terms.
                    <br />
                    <strong>Customer Care:</strong> Mon-Sat, 9AM-6PM
                  </div>
                </div>

                {/* Status Badge - Screen Only */}
                <div className="print:hidden bg-success-light border border-success rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-success-dark">
                      Order Confirmed
                    </p>
                    <p className="text-sm text-neutral-600">
                      Your order has been confirmed and will be delivered soon.
                    </p>
                  </div>
                </div>
              </div>

              {/* Receipt Footer */}
              <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200 print:hidden">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleDownloadReceipt}
                    leftIcon={<Download className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Download as Image
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handlePrint}
                    leftIcon={<Printer className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Print Receipt
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => navigate("/")}
                    leftIcon={<Home className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Go to Home
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* What's Next Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
            >
              <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4">
                What happens next?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    step: "1",
                    title: "Order Processing",
                    desc: "Your order is being prepared",
                  },
                  {
                    step: "2",
                    title: "Quality Check",
                    desc: "We verify product quality",
                  },
                  {
                    step: "3",
                    title: "Delivery",
                    desc: "Product shipped to your address",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-bold text-sm">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {item.title}
                      </p>
                      <p className="text-sm text-neutral-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate("/order-status")}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Track Your Order
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
