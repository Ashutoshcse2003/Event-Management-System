import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Button from "../components/Button";

export default function FlowChart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-white rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-heading font-bold text-neutral-900">
                System Flow Chart
              </h1>
              <p className="text-neutral-600">
                Event Management System Navigation Flow
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate("/")}
            leftIcon={<Home className="w-4 h-4" />}
          >
            Home
          </Button>
        </motion.div>

        {/* Flow Chart Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8"
        >
          <div className="space-y-8">
            {/* Start */}
            <div className="text-center">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-semibold">
                START → INDEX
              </div>
            </div>

            {/* Login */}
            <div className="text-center">
              <div className="inline-block px-6 py-3 bg-primary-100 text-primary-700 rounded-lg font-semibold border-2 border-primary-300">
                LOGIN
              </div>
            </div>

            {/* Three Paths */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Vendor Path */}
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 border-2 border-purple-300 rounded-lg text-center font-semibold text-purple-700">
                  VENDOR
                </div>
                <div className="p-3 bg-purple-100 rounded-lg text-center text-sm">
                  Main Page
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-white border border-purple-200 rounded text-center text-sm">
                    Your Items
                  </div>
                  <div className="p-2 bg-white border border-purple-200 rounded text-center text-sm">
                    Add New Item
                  </div>
                  <div className="p-2 bg-white border border-purple-200 rounded text-center text-sm">
                    Transactions
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-purple-50 rounded">Insert</div>
                  <div className="p-2 bg-purple-50 rounded">Product Status</div>
                  <div className="p-2 bg-purple-50 rounded">Delete</div>
                  <div className="p-2 bg-purple-50 rounded">User Request</div>
                </div>
                <div className="p-2 bg-purple-100 rounded text-center text-sm">
                  View Products
                </div>
              </div>

              {/* Admin Path */}
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 border-2 border-orange-300 rounded-lg text-center font-semibold text-orange-700">
                  ADMIN
                </div>
                <div className="p-3 bg-orange-100 rounded-lg text-center text-sm">
                  Maintenance Menu
                  <br />
                  (Admin access only)
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-white border border-orange-200 rounded text-center text-sm">
                    Add/Update Member/Shops
                  </div>
                  <div className="p-3 bg-white border border-orange-200 rounded text-center text-sm">
                    Add/Update User/Vendor
                  </div>
                  <div className="p-3 bg-white border border-orange-200 rounded text-center text-sm">
                    Vendor Management
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-orange-100 rounded text-center text-sm">
                    Add Membership for Vendor
                  </div>
                  <div className="p-2 bg-orange-100 rounded text-center text-sm">
                    Update Membership for Vendor
                  </div>
                </div>
              </div>

              {/* User Path */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg text-center font-semibold text-blue-700">
                  USER
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-blue-100 rounded text-center text-sm">
                    Vendor
                  </div>
                  <div className="p-2 bg-blue-100 rounded text-center text-sm">
                    Cart
                  </div>
                  <div className="p-2 bg-blue-100 rounded text-center text-sm">
                    Guest List
                  </div>
                  <div className="p-2 bg-blue-100 rounded text-center text-sm">
                    Order Status
                  </div>
                </div>
                <div className="p-2 bg-blue-50 rounded text-center text-sm">
                  Logout
                </div>
                <div className="space-y-2 mt-4">
                  <div className="p-2 bg-white border border-blue-200 rounded text-center text-sm">
                    Payment
                  </div>
                  <div className="p-2 bg-white border border-blue-200 rounded text-center text-sm">
                    Update
                  </div>
                  <div className="p-2 bg-white border border-blue-200 rounded text-center text-sm">
                    Total Amount
                  </div>
                  <div className="p-2 bg-white border border-blue-200 rounded text-center text-sm">
                    Check Status
                  </div>
                  <div className="p-2 bg-white border border-blue-200 rounded text-center text-sm">
                    Delete
                  </div>
                </div>
                <div className="p-2 bg-blue-100 rounded text-center text-sm">
                  Cancel
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="p-6 bg-primary-50 rounded-xl border border-primary-200">
              <h3 className="font-bold text-primary-900 mb-4 text-lg">
                System Requirements & Notes:
              </h3>
              <ul className="space-y-2 text-sm text-primary-800">
                <li>✓ Flow shows overall pages/screens in the application</li>
                <li>
                  ✓ Maintenance module creates reports and transaction modules
                </li>
                <li>✓ Basic formatting is acceptable</li>
                <li>
                  ✓ Chart link on all pages helps navigate (not required in
                  working app)
                </li>
                <li>✓ Radio buttons - only one can be selected</li>
                <li>✓ Checkbox - checked implies yes, unchecked implies no</li>
                <li>✓ Passwords hidden on login pages</li>
                <li>
                  ✓ Admin can access maintenance, reports, and transactions
                </li>
                <li>
                  ✓ User cannot access maintenance but has reports and
                  transactions
                </li>
                <li>✓ Validations on forms</li>
                <li>✓ Session management works properly</li>
                <li>✓ Maintenance Menu (Admin access only)</li>
                <li>✓ Flow matches the chart</li>
              </ul>
            </div>

            {/* Membership Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-bold text-green-900 mb-3">
                  Add Membership:
                </h4>
                <p className="text-sm text-green-800">
                  All fields mandatory. User selects: 6 months, 1 year, or 2
                  years. Default: 6 months.
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3">
                  Update Membership:
                </h4>
                <p className="text-sm text-blue-800">
                  Membership Number mandatory. Based on this, rest fields
                  populate. User can extend or cancel. Default: 6 months
                  extension.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
