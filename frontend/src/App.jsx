import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ToastProvider } from "./contexts/ToastContext";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Certificates from "./pages/Certificates";
import Login from "./pages/Login";
import LoginSelection from "./pages/LoginSelection";
import RoleLogin from "./pages/RoleLogin";
import UserSignup from "./pages/UserSignup";
import VendorSignup from "./pages/VendorSignup";
import AdminSignup from "./pages/AdminSignup";
import FlowChart from "./pages/FlowChart";
import VendorMain from "./pages/VendorMain";
import AdminMaintenance from "./pages/AdminMaintenance";
import VendorYourItems from "./pages/vendor/VendorYourItems";
import VendorAddNewItem from "./pages/vendor/VendorAddNewItem";
import VendorTransactions from "./pages/vendor/VendorTransactions";
import VendorList from "./pages/user/VendorList";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import OrderSuccess from "./pages/user/OrderSuccess";
import GuestList from "./pages/user/GuestList";
import OrderStatus from "./pages/user/OrderStatus";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageVendors from "./pages/admin/ManageVendors";
import TestAPI from "./pages/TestAPI";
import Header from "./components/Header";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test-api" element={<TestAPI />} />
          <Route path="/login" element={<LoginSelection />} />
          <Route path="/login/:role" element={<RoleLogin />} />
          <Route path="/signup/user" element={<UserSignup />} />
          <Route path="/signup/vendor" element={<VendorSignup />} />
          <Route path="/signup/admin" element={<AdminSignup />} />
          <Route path="/chart" element={<FlowChart />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <Certificates />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/maintenance"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminMaintenance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-vendors"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageVendors />
              </ProtectedRoute>
            }
          />

          {/* Vendor routes */}
          <Route
            path="/vendor"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <VendorMain />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/your-items"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <VendorYourItems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/add-new"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <VendorAddNewItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/transactions"
            element={
              <ProtectedRoute allowedRoles={["vendor"]}>
                <VendorTransactions />
              </ProtectedRoute>
            }
          />

          {/* User flows */}
          <Route path="/vendors" element={<VendorList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/guest-list" element={<GuestList />} />
          <Route path="/order-status" element={<OrderStatus />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}
