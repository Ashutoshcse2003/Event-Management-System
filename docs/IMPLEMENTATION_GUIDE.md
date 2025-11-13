# 🚀 Event Management System - Development Implementation Guide

## Step-by-Step Development Roadmap

---

## 📋 Table of Contents

1. [Project Setup & Architecture](#project-setup--architecture)
2. [Phase 1: Core Foundation](#phase-1-core-foundation)
3. [Phase 2: Admin Module](#phase-2-admin-module)
4. [Phase 3: Vendor Module](#phase-3-vendor-module)
5. [Phase 4: User Module](#phase-4-user-module)
6. [Phase 5: Advanced Features](#phase-5-advanced-features)
7. [Phase 6: Polish & Optimization](#phase-6-polish--optimization)
8. [Testing Strategy](#testing-strategy)
9. [Deployment Guide](#deployment-guide)

---

## 🏗️ Project Setup & Architecture

### Technology Stack Decision

**Frontend:**

```
Framework: React 18+ with Vite
Language: JavaScript (TypeScript recommended for production)
Styling: Tailwind CSS + Custom CSS for animations
State Management: React Context API + Local State
Routing: React Router v6
HTTP Client: Axios
Form Handling: React Hook Form + Yup validation
UI Components: Custom components based on design system
Icons: Lucide React
Charts: Recharts
Animations: Framer Motion
```

**Backend:**

```
Framework: Node.js 18+ with Express.js
Language: JavaScript (TypeScript recommended)
Database: MongoDB with Mongoose OR PostgreSQL with Sequelize
Authentication: JWT (JSON Web Tokens) + bcrypt
File Upload: Multer
Image Processing: Sharp
Email: Nodemailer with Gmail SMTP
Payment (future): Stripe/Razorpay SDK
```

**DevOps:**

```
Version Control: Git + GitHub
Package Manager: npm or yarn
Build Tool: Vite
Linting: ESLint + Prettier
Testing: Vitest (unit) + Playwright (E2E)
CI/CD: GitHub Actions
Hosting: Vercel (frontend) + Railway/Render (backend)
Database Hosting: MongoDB Atlas / Supabase PostgreSQL
```

---

### Folder Structure

```
event-management-system/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 # Database connection
│   │   │   └── jwt.js                # JWT configuration
│   │   ├── models/
│   │   │   ├── User.js               # User schema
│   │   │   ├── Vendor.js             # Vendor schema
│   │   │   ├── Product.js            # Product schema
│   │   │   ├── Order.js              # Order schema
│   │   │   └── Category.js           # Category schema
│   │   ├── controllers/
│   │   │   ├── authController.js     # Login/Signup logic
│   │   │   ├── userController.js     # User operations
│   │   │   ├── vendorController.js   # Vendor operations
│   │   │   ├── productController.js  # Product CRUD
│   │   │   ├── orderController.js    # Order management
│   │   │   └── adminController.js    # Admin operations
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── vendorRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── adminRoutes.js
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT verification
│   │   │   ├── roleCheck.js          # Role-based access
│   │   │   ├── upload.js             # File upload handling
│   │   │   └── errorHandler.js       # Global error handler
│   │   ├── utils/
│   │   │   ├── emailService.js       # Email sending
│   │   │   ├── imageUpload.js        # Image processing
│   │   │   └── validators.js         # Input validation
│   │   └── server.js                 # App entry point
│   ├── uploads/                      # Uploaded files
│   ├── .env                          # Environment variables
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   ├── hero-bg.jpg
│   │   │   └── placeholder.png
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Dropdown.jsx
│   │   │   │   └── Badge.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── DashboardLayout.jsx
│   │   │   ├── admin/
│   │   │   │   ├── UserTable.jsx
│   │   │   │   ├── VendorTable.jsx
│   │   │   │   ├── OrderTable.jsx
│   │   │   │   └── StatsCard.jsx
│   │   │   ├── vendor/
│   │   │   │   ├── ProductForm.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   └── OrderRequest.jsx
│   │   │   └── user/
│   │   │       ├── VendorCard.jsx
│   │   │       ├── ProductGrid.jsx
│   │   │       ├── CartItem.jsx
│   │   │       └── CheckoutForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Signup.jsx
│   │   │   │   └── ForgotPassword.jsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── ManageUsers.jsx
│   │   │   │   ├── ManageVendors.jsx
│   │   │   │   ├── OrderStatus.jsx
│   │   │   │   └── ProductStatus.jsx
│   │   │   ├── vendor/
│   │   │   │   ├── VendorDashboard.jsx
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── EditProduct.jsx
│   │   │   │   └── Transactions.jsx
│   │   │   └── user/
│   │   │       ├── UserDashboard.jsx
│   │   │       ├── VendorCategory.jsx
│   │   │       ├── VendorList.jsx
│   │   │       ├── ProductList.jsx
│   │   │       ├── Cart.jsx
│   │   │       ├── Checkout.jsx
│   │   │       └── OrderSuccess.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # User authentication state
│   │   │   ├── CartContext.jsx       # Shopping cart state
│   │   │   └── ToastContext.jsx      # Toast notifications
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   ├── useToast.js
│   │   │   └── useApi.js
│   │   ├── services/
│   │   │   ├── api.js                # Axios configuration
│   │   │   ├── authService.js        # Auth API calls
│   │   │   ├── userService.js        # User API calls
│   │   │   ├── vendorService.js      # Vendor API calls
│   │   │   ├── productService.js     # Product API calls
│   │   │   └── orderService.js       # Order API calls
│   │   ├── utils/
│   │   │   ├── constants.js          # App constants
│   │   │   ├── helpers.js            # Helper functions
│   │   │   └── validators.js         # Form validation
│   │   ├── styles/
│   │   │   ├── globals.css           # Global styles + design tokens
│   │   │   ├── animations.css        # Custom animations
│   │   │   └── components.css        # Component-specific styles
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx                # Route configuration
│   ├── .env.local
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
│
├── docs/
│   ├── DESIGN_SYSTEM.md              # Design system (already created)
│   ├── API_DOCUMENTATION.md          # API endpoints reference
│   ├── USER_GUIDE.md                 # End-user documentation
│   └── DEVELOPER_GUIDE.md            # Developer setup guide
│
└── README.md                         # Project overview
```

---

## 📦 Phase 1: Core Foundation (Week 1-2)

### Step 1.1: Environment Setup

**Backend Setup:**

```bash
# Create backend folder
mkdir backend && cd backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express mongoose dotenv bcryptjs jsonwebtoken cors express-validator
npm install multer sharp nodemailer

# Install dev dependencies
npm install --save-dev nodemon eslint prettier
```

**Frontend Setup:**

```bash
# Create Vite React app
npm create vite@latest frontend -- --template react

cd frontend

# Install dependencies
npm install react-router-dom axios
npm install framer-motion lucide-react recharts
npm install react-hook-form yup

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

### Step 1.2: Design Token Implementation

**File: frontend/src/styles/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Color System */
  --primary-50: #ebf3ff;
  --primary-500: #1f5eff;
  --primary-600: #1848cc;

  --secondary-500: #77b1ff;

  --neutral-0: #ffffff;
  --neutral-100: #f3f4f6;
  --neutral-500: #6b7280;
  --neutral-900: #111827;

  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;

  /* Typography */
  --font-heading: "Poppins", sans-serif;
  --font-body: "Inter", sans-serif;

  /* Spacing */
  --space-1: 0.25rem;
  --space-4: 1rem;
  --space-6: 1.5rem;

  /* Shadows */
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* Border Radius */
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;

  /* Animations */
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  color: var(--neutral-900);
  background: var(--neutral-0);
  line-height: 1.6;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-heading);
  font-weight: 600;
}
```

---

### Step 1.3: Base Component Library

**Priority Components to Build:**

1. **Button Component**

   - Variants: primary, secondary, ghost, danger
   - Sizes: small, medium, large
   - States: default, hover, active, disabled, loading
   - Icon support: left, right, only icon

2. **Input Component**

   - Types: text, email, password, number, textarea
   - States: default, focus, error, success, disabled
   - Icon support: left, right
   - Label and helper text

3. **Card Component**

   - Variants: default, hover, clickable
   - Shadow levels: sm, md, lg
   - Padding options

4. **Modal Component**

   - Backdrop blur
   - Close button
   - Header, body, footer slots
   - Animations: fade + scale

5. **Toast Component**
   - Types: success, error, warning, info
   - Auto-dismiss with timer
   - Close button
   - Stacking support

---

### Step 1.4: Authentication Foundation

**Backend: User Model**

```javascript
// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "vendor", "user"], default: "user" },
  phone: String,
  address: String,
  city: String,
  state: String,
  pinCode: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
```

**Backend: Auth Controller**

```javascript
// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user
    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if active
    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
```

**Frontend: Auth Context**

```javascript
// context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { loginApi, signupApi } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Check if token exists and fetch user data
    if (token) {
      // Decode token and set user (implement JWT decode)
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const response = await loginApi(email, password);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    return response;
  };

  const signup = async (data) => {
    const response = await signupApi(data);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    return response;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 🔐 Phase 2: Admin Module (Week 3-4)

### Step 2.1: Admin Dashboard Layout

**Screen Design:**

```
┌─────────────────────────────────────────────────┐
│  [Logo] Event Management      [🔔] [Admin ▼]   │ ← Top Nav
├─────────────────────────────────────────────────┤
│ 📊 Dashboard                   ADMIN DASHBOARD  │
│ 👥 Manage Users                                 │
│ 🏪 Manage Vendors              ┌─────┬─────┬───┐
│ 📦 Product Status              │Users│Vends│Ord│ ← Stats Cards
│ 🛒 Order Status                └─────┴─────┴───┘
│ ⚙️  Settings                                    │
│ 🚪 Logout                      [Chart Area]     │
│                                                  │
│                                [Recent Activity] │
└─────────────────────────────────────────────────┘
```

**Implementation Steps:**

1. **Create Admin Layout Component**

   - Sidebar navigation
   - Top navbar with notifications
   - Main content area
   - Responsive (hamburger menu on mobile)

2. **Build Stats Cards**

   - Total users count
   - Total vendors count
   - Total orders count
   - Revenue (future)
   - Each card: icon + label + large number
   - Animated count-up on load
   - Color-coded (primary gradient)

3. **Dashboard Charts**

   - Orders per day (line chart)
   - Vendor category distribution (pie chart)
   - User registrations (bar chart)
   - Use Recharts library

4. **Recent Activity Feed**
   - Timeline component
   - Shows: new users, new vendors, new orders
   - Real-time updates (or refresh on interval)

---

### Step 2.2: Manage Users Screen

**Features:**

- User table with columns:

  - Avatar (initials)
  - Name
  - Email
  - Role (badge)
  - Status (Active/Inactive badge)
  - Join Date
  - Actions (Edit, Delete, Toggle Status)

- Search and filter:

  - Search by name/email
  - Filter by role
  - Filter by status

- Bulk actions:

  - Select multiple users
  - Delete selected
  - Activate/Deactivate selected

- Add new user button:
  - Opens modal with user form

**Backend API:**

```javascript
// GET /api/admin/users?search=john&role=vendor&page=1&limit=10
// POST /api/admin/users (create user)
// PUT /api/admin/users/:id (update user)
// DELETE /api/admin/users/:id (delete user)
// PATCH /api/admin/users/:id/toggle-status (activate/deactivate)
```

---

### Step 2.3: Manage Vendors Screen

**Features:**

- Vendor table with:

  - Vendor name
  - Email
  - Category
  - Product count
  - Status (Pending, Approved, Rejected)
  - Join date
  - Actions (Approve, Reject, View Products, Delete)

- Vendor approval workflow:

  - New vendors start as "Pending"
  - Admin can approve/reject
  - Rejected vendors receive email notification
  - Approved vendors can start adding products

- View vendor details modal:
  - Vendor info
  - List of products
  - Order history

**Backend API:**

```javascript
// GET /api/admin/vendors
// GET /api/admin/vendors/:id/products
// PATCH /api/admin/vendors/:id/approve
// PATCH /api/admin/vendors/:id/reject
// DELETE /api/admin/vendors/:id
```

---

### Step 2.4: Product Status Screen

**Features:**

- All products from all vendors
- Table columns:

  - Product image (thumbnail)
  - Product name
  - Vendor name
  - Category
  - Price
  - Status (Active, Inactive, Out of Stock)
  - Actions (View, Edit, Delete, Toggle Status)

- Filters:

  - By vendor
  - By category
  - By status
  - By price range

- Product approval (optional):
  - Admin can hide/show products
  - Mark products as featured

**Backend API:**

```javascript
// GET /api/admin/products
// PUT /api/admin/products/:id
// DELETE /api/admin/products/:id
// PATCH /api/admin/products/:id/toggle-status
```

---

### Step 2.5: Order Status Screen

**Features:**

- All orders from all users
- Table columns:

  - Order ID
  - User name
  - Vendor name
  - Products (count or list)
  - Total amount
  - Payment method
  - Status (Pending, Confirmed, Completed, Cancelled)
  - Order date
  - Actions (View Details, Update Status)

- Order details modal:

  - User info
  - Vendor info
  - Product list with quantities and prices
  - Total amount
  - Payment method
  - Delivery address
  - Status update dropdown

- Status management:
  - Admin can change order status
  - Status options: Pending → Confirmed → Completed
  - Cancel order option

**Backend API:**

```javascript
// GET /api/admin/orders
// GET /api/admin/orders/:id
// PATCH /api/admin/orders/:id/status
```

---

## 🏪 Phase 3: Vendor Module (Week 5-6)

### Step 3.1: Vendor Dashboard

**Screen Design:**

```
┌─────────────────────────────────────────────────┐
│  [Logo] Vendor Portal         [🔔] [Vendor ▼]  │
├─────────────────────────────────────────────────┤
│ 📊 Dashboard                  VENDOR DASHBOARD  │
│ ➕ Add Product                                  │
│ 📦 My Products                ┌─────┬─────┬───┐
│ 🛒 Orders/Requests            │Prod.│Order│Rev│ ← Stats
│ ⚙️  Settings                  └─────┴─────┴───┘
│ 🚪 Logout                                       │
│                               [Recent Orders]   │
│                               [Top Products]    │
└─────────────────────────────────────────────────┘
```

**Features:**

- Stats cards:

  - Total products
  - Total orders received
  - Total revenue (sum of all order amounts)
  - Pending orders count

- Recent orders list:

  - Last 10 orders
  - Shows: Order ID, user name, product, amount, status
  - Quick action: Update status

- Top selling products:
  - Products with most orders
  - Shows: Product image, name, orders count

---

### Step 3.2: Add Product Screen

**Form Fields:**

- Product name (text, required)
- Product price (number, required, min: 0)
- Product category (dropdown, required)
  - Options: Catering, Florist, Decoration, Lighting, Photography, etc.
- Product description (textarea, optional)
- Product image (file upload, required, max 5MB)
  - Preview uploaded image
  - Drag-and-drop support

**Form Validation:**

- All required fields must be filled
- Price must be positive number
- Image must be valid (jpg, png, webp)
- Show real-time validation errors

**Success Flow:**

- Show success toast
- Redirect to product list OR clear form for another product
- Backend processes image (resize, optimize)

**Backend API:**

```javascript
// POST /api/vendor/products
// Body: multipart/form-data (for image upload)
// Response: Created product with image URL
```

---

### Step 3.3: Product List Screen

**Features:**

- Grid view of vendor's products
- Each product card shows:

  - Product image (hover zoom effect)
  - Product name
  - Price (large, bold, primary color)
  - Category badge
  - Status badge (Active/Inactive)
  - Action buttons: Edit, Delete

- Empty state:

  - If no products, show illustration
  - Message: "No products yet"
  - Call-to-action: "Add your first product"

- Search products by name
- Filter by category
- Sort by: Newest, Price (low to high, high to low), Name

**Edit Product:**

- Clicking "Edit" opens modal or navigates to edit page
- Pre-filled form with existing data
- Can update all fields including image

**Delete Product:**

- Confirmation dialog: "Are you sure you want to delete this product?"
- If confirmed, delete and show success toast
- Refresh product list

**Backend API:**

```javascript
// GET /api/vendor/products (vendor's products only)
// GET /api/vendor/products/:id
// PUT /api/vendor/products/:id
// DELETE /api/vendor/products/:id
```

---

### Step 3.4: Orders/Transactions Screen

**Features:**

- Table of orders received from users
- Columns:

  - Order ID
  - User name
  - Product name
  - Quantity
  - Total price
  - Payment method
  - Order date
  - Status (Pending, Confirmed, Completed)
  - Actions: Update Status, View Details

- Order details modal:

  - User contact info
  - Delivery address
  - Product details
  - Update status dropdown
  - Notes section (optional)

- Status update:

  - Vendor can change status: Pending → Confirmed → Completed
  - Status change sends notification to user (email)

- Filter orders:
  - By status
  - By date range

**Backend API:**

```javascript
// GET /api/vendor/orders (orders for vendor's products)
// GET /api/vendor/orders/:id
// PATCH /api/vendor/orders/:id/status
```

---

## 👤 Phase 4: User Module (Week 7-8)

### Step 4.1: User Dashboard / Home

**Screen Design:**

```
┌─────────────────────────────────────────────────┐
│ [Logo] EventMart        [Cart:3] [User ▼]      │ ← Top Nav
├─────────────────────────────────────────────────┤
│                                                  │
│      🎉 Welcome to Event Services Marketplace   │
│                                                  │
│  [Category Dropdown ▼]    OR    [Browse All →]  │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  🍴      │  │  🌸      │  │  🎨      │      │
│  │Catering  │  │ Florist  │  │Decoration│      │ ← Quick Access
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                  │
│  [Featured Vendors Section]                     │
│  [Popular Products Grid]                        │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Features:**

- Hero section:

  - Eye-catching gradient background
  - Welcome message
  - Category dropdown (large, prominent)
  - CTA button: "Browse All Vendors"

- Quick category cards:

  - Icon + category name
  - Clickable, navigates to category page
  - Hover effect: lift + shadow

- Featured vendors section:

  - Carousel or grid of vendor cards
  - Each card: Vendor logo/image, name, category, "View Products" button

- Popular products section:
  - Grid of product cards
  - Shows products from multiple vendors
  - Each card: Image, name, price, vendor name, "Add to Cart" button

---

### Step 4.2: Category Selection & Vendor List

**Flow:**

1. User selects category from dropdown or clicks category card
2. Navigates to `/vendors?category=Catering`
3. Shows all vendors in that category

**Vendor List Screen:**

```
Category: Catering

┌──────────┐  ┌──────────┐  ┌──────────┐
│ [Image]  │  │ [Image]  │  │ [Image]  │
│ Vendor 1 │  │ Vendor 2 │  │ Vendor 3 │
│ ⭐4.5    │  │ ⭐4.8    │  │ ⭐4.2    │
│ [View]   │  │ [View]   │  │ [View]   │
└──────────┘  └──────────┘  └──────────┘
```

**Features:**

- Category title at top
- Grid of vendor cards
- Each vendor card:

  - Vendor image/logo
  - Vendor name
  - Rating (future feature, for now just display)
  - Product count
  - "View Products" button

- Filter sidebar:

  - By rating (future)
  - By price range (future)

- Empty state:
  - If no vendors in category, show message
  - "No vendors found in this category"

**Backend API:**

```javascript
// GET /api/vendors?category=Catering
// Response: Array of vendor objects with product count
```

---

### Step 4.3: Vendor Product List

**Flow:**

1. User clicks "View Products" on a vendor card
2. Navigates to `/vendors/:vendorId/products`
3. Shows all products from that specific vendor

**Screen Design:**

```
┌─────────────────────────────────────────────────┐
│ ← Back to Vendors                               │
│                                                  │
│ [Vendor Logo] Vendor Name                       │
│ Category: Catering                              │
│                                                  │
│ Products:                                       │
│                                                  │
│ ┌───────────┐  ┌───────────┐  ┌───────────┐   │
│ │ [Image]   │  │ [Image]   │  │ [Image]   │   │
│ │ Product 1 │  │ Product 2 │  │ Product 3 │   │
│ │ ₹500      │  │ ₹800      │  │ ₹1200     │   │
│ │[Add Cart] │  │[Add Cart] │  │[Add Cart] │   │
│ └───────────┘  └───────────┘  └───────────┘   │
└─────────────────────────────────────────────────┘
```

**Product Card Design:**

- Product image (hover: zoom slightly)
- Product name (truncate if long)
- Product price (large, bold, primary color)
- Product description (truncate to 2 lines, "Read more" expands)
- "Add to Cart" button (primary button)
  - Click: Add to cart, show toast "Added to cart!"
  - If already in cart: Change to "Added ✓" with success color

**Empty state:**

- "This vendor has no products yet"

**Backend API:**

```javascript
// GET /api/vendors/:vendorId/products
// Response: Array of product objects
```

---

### Step 4.4: Shopping Cart

**Cart Context:**

```javascript
// Manage cart state globally
{
  items: [
    { productId, vendorId, name, price, image, quantity }
  ],
  totalItems: 5,
  totalPrice: 4500
}

// Actions: addToCart, removeFromCart, updateQuantity, clearCart
```

**Cart Screen:**

```
┌─────────────────────────────────────────────────┐
│ Shopping Cart (3 items)                         │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │ [Image] Product Name           Vendor Name  │ │
│ │         ₹500                                │ │
│ │         Qty: [−] 2 [+]         ₹1000        │ │
│ │         [Remove]                            │ │
│ └─────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────┐ │
│ │ [Image] Product Name 2         Vendor Name  │ │
│ │         ₹800                                │ │
│ │         Qty: [−] 1 [+]         ₹800         │ │
│ │         [Remove]                            │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Subtotal:                          ₹1800    │ │
│ │ Tax (optional):                    ₹180     │ │
│ │ Total:                             ₹1980    │ │
│ │                                              │ │
│ │           [Proceed to Checkout] →           │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Features:**

- Cart item card:

  - Product image (small)
  - Product name
  - Vendor name (small, muted)
  - Unit price
  - Quantity controls: Decrement, number, increment
  - Line total (unit price × quantity)
  - Remove button (trash icon)

- Quantity controls:

  - Decrement: Disable if quantity = 1, click removes item
  - Increment: Max quantity limit (e.g., 10)

- Cart summary (sticky on scroll):

  - Subtotal (sum of all line totals)
  - Tax (optional, calculate based on subtotal)
  - Total
  - "Proceed to Checkout" button (primary, large)

- Empty cart state:
  - Illustration
  - Message: "Your cart is empty"
  - Button: "Start Shopping"

---

### Step 4.5: Checkout

**Checkout Form:**

```
┌─────────────────────────────────────────────────┐
│ Checkout                                        │
├─────────────────────────────────────────────────┤
│ Delivery Information                            │
│ ┌─────────────────────────────────────────────┐ │
│ │ Full Name:     [____________]               │ │
│ │ Email:         [____________]               │ │
│ │ Phone:         [____________]               │ │
│ │ Address:       [____________________]       │ │
│ │ City:          [____________]               │ │
│ │ State:         [____________]               │ │
│ │ Pin Code:      [______]                     │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ Payment Method                                  │
│ ( ) Cash on Delivery                            │
│ ( ) UPI / Online Payment                        │
│                                                  │
│ Order Summary                                   │
│ ┌─────────────────────────────────────────────┐ │
│ │ 3 items                                      │ │
│ │ Total: ₹1980                                 │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│          [Place Order]                          │
└─────────────────────────────────────────────────┘
```

**Form Validation:**

- All fields required (except UPI details)
- Email format validation
- Phone number: 10 digits
- Pin code: 6 digits
- Real-time validation, show errors below fields

**Place Order Flow:**

1. Validate form
2. Create order API call with cart items, user details, payment method
3. If success:
   - Clear cart
   - Navigate to Order Success page
4. If error:
   - Show error toast
   - Allow user to retry

**Backend API:**

```javascript
// POST /api/orders
// Body: { items: [...], userDetails: {...}, paymentMethod: 'Cash' }
// Response: Order object with orderId
```

---

### Step 4.6: Order Success

**Screen Design:**

```
┌─────────────────────────────────────────────────┐
│                                                  │
│              ✅ Order Placed Successfully!       │
│                                                  │
│           Your order ID: #EV12345                │
│                                                  │
│   You will receive a confirmation email shortly │
│                                                  │
│   ┌─────────────────────────────────────────┐   │
│   │ Order Summary                           │   │
│   │ 3 items | Total: ₹1980                  │   │
│   │ Payment: Cash on Delivery               │   │
│   │ Delivery: [Address]                     │   │
│   └─────────────────────────────────────────┘   │
│                                                  │
│   [View Order Details]  [Continue Shopping]     │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Features:**

- Success checkmark icon (animated scale-in)
- Order ID (large, copy button)
- Order summary card
- Two buttons:
  - "View Order Details": Navigate to order detail page
  - "Continue Shopping": Navigate to home

---

## 🚀 Phase 5: Advanced Features (Week 9-10)

### Step 5.1: Order Tracking for Users

**My Orders Page:**

- List of all orders placed by user
- Order card:
  - Order ID
  - Order date
  - Total amount
  - Status badge (Pending, Confirmed, Completed, Cancelled)
  - "View Details" button

**Order Details:**

- Order info
- Product list with images, names, quantities, prices
- Vendor info
- Delivery address
- Payment method
- Order status timeline:
  - Placed → Confirmed → In Progress → Completed

---

### Step 5.2: Email Notifications

**Use Nodemailer to send emails:**

Trigger emails on:

1. User registration: Welcome email
2. Order placed: Order confirmation email (to user and vendor)
3. Order status updated: Email to user
4. Vendor approved: Email to vendor

**Email Templates:**

- HTML templates with branding
- Include order details, links, etc.

---

### Step 5.3: Image Optimization

**Backend: Sharp library**

- On product image upload:
  - Resize to multiple sizes (thumbnail, medium, large)
  - Optimize file size
  - Convert to WebP format
  - Store in cloud storage (Cloudinary or AWS S3)

**Frontend: Lazy loading**

- Use `loading="lazy"` attribute for images
- Placeholder blur effect while loading

---

### Step 5.4: Search Functionality

**Global search bar:**

- In navbar
- Search products by name
- Debounced input (300ms)
- Show search results dropdown
- Click result: Navigate to product or vendor

**Backend API:**

```javascript
// GET /api/search?q=flowers
// Search across products and vendors
// Response: { products: [...], vendors: [...] }
```

---

### Step 5.5: Wishlist / Favorites (Optional)

**Features:**

- Heart icon on product cards
- Click: Add to wishlist
- Wishlist page: Grid of saved products
- "Add to Cart" directly from wishlist

---

## 🎨 Phase 6: Polish & Optimization (Week 11-12)

### Step 6.1: Animation Implementation

**Page Transitions:**

```javascript
// Use Framer Motion
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  transition={{ duration: 0.3 }}
>
  {/* Page content */}
</motion.div>;
```

**Component Animations:**

- Button hover: Scale 1.02, shadow increase
- Card hover: TranslateY -4px, shadow increase
- Modal: Scale + fade in
- Toast: Slide in from right
- List items: Stagger animation (each item delayed by 50ms)

---

### Step 6.2: Loading States

**Skeleton Loaders:**

- Product card skeleton
- Table row skeleton
- Dashboard stats skeleton

**Spinners:**

- Button loading state
- Full-page loader for initial load

**Progress Indicators:**

- File upload progress bar
- Form submission progress

---

### Step 6.3: Error Handling

**Error Boundaries:**

- Catch React errors
- Show fallback UI: "Something went wrong"

**API Error Handling:**

- Network error: Show toast "Network error, please try again"
- 401 Unauthorized: Redirect to login
- 403 Forbidden: Show "You don't have permission"
- 404 Not Found: Show "Resource not found"
- 500 Server Error: Show "Server error, please try again later"

**Form Errors:**

- Inline validation errors
- Highlight invalid fields with red border
- Error message below field

---

### Step 6.4: Performance Optimization

**Frontend:**

- Code splitting (lazy load routes)
- Image lazy loading
- Memoization (React.memo, useMemo, useCallback)
- Debounce search inputs
- Virtualized lists for long lists (react-window)

**Backend:**

- Database indexing (email, vendorId, productId)
- Query optimization
- Caching with Redis (frequently accessed data)
- Pagination for lists (limit 20 items per page)
- Rate limiting to prevent abuse

---

### Step 6.5: Responsive Design

**Breakpoints:**

- Mobile: < 640px (single column, hamburger menu)
- Tablet: 640px - 1024px (2 columns, collapsible sidebar)
- Desktop: > 1024px (full layout)

**Mobile Optimizations:**

- Touch-friendly buttons (minimum 44px height)
- Simplified navigation
- Bottom navigation bar (optional)
- Swipe gestures for carousels

---

### Step 6.6: Accessibility (A11y)

**Keyboard Navigation:**

- All interactive elements: Tab accessible
- Focus indicators visible
- Logical tab order

**Screen Readers:**

- Semantic HTML (header, nav, main, article)
- ARIA labels for icons
- Alt text for images
- Form labels associated with inputs

**Color Contrast:**

- Text contrast ratio: 4.5:1 minimum
- Use color contrast checker tools

---

## 🧪 Testing Strategy

### Unit Tests (Vitest)

- Test utility functions
- Test custom hooks
- Test API service functions

### Component Tests (React Testing Library)

- Test component rendering
- Test user interactions (clicks, form submissions)
- Test conditional rendering

### Integration Tests

- Test API endpoints with mock database
- Test authentication flow
- Test order creation flow

### E2E Tests (Playwright)

- Complete user journey: Signup → Browse → Add to cart → Checkout
- Vendor journey: Login → Add product → View orders
- Admin journey: Login → Approve vendor → View stats

---

## 🚀 Deployment Guide

### Backend Deployment (Railway / Render)

**Steps:**

1. Push code to GitHub
2. Connect Railway/Render to GitHub repo
3. Set environment variables:
   - `MONGO_URI` (MongoDB connection string)
   - `JWT_SECRET` (random secure string)
   - `EMAIL_USER`, `EMAIL_PASS` (for nodemailer)
4. Deploy
5. Note backend URL (e.g., https://api-eventmart.railway.app)

---

### Frontend Deployment (Vercel)

**Steps:**

1. Push frontend code to GitHub
2. Connect Vercel to GitHub repo
3. Set environment variables:
   - `VITE_API_URL` (backend URL from above)
4. Deploy
5. Custom domain (optional)

---

### Database Hosting

**MongoDB Atlas:**

1. Create free cluster
2. Add database user
3. Whitelist IPs (0.0.0.0/0 for all)
4. Copy connection string
5. Use in backend .env

---

## 📊 Project Timeline Summary

| Phase                      | Duration     | Deliverables                                             |
| -------------------------- | ------------ | -------------------------------------------------------- |
| Phase 1: Foundation        | 2 weeks      | Environment setup, design tokens, auth, base components  |
| Phase 2: Admin Module      | 2 weeks      | Admin dashboard, manage users/vendors/products/orders    |
| Phase 3: Vendor Module     | 2 weeks      | Vendor dashboard, add/edit products, order management    |
| Phase 4: User Module       | 2 weeks      | Home, browse vendors/products, cart, checkout            |
| Phase 5: Advanced Features | 2 weeks      | Order tracking, emails, search, image optimization       |
| Phase 6: Polish            | 2 weeks      | Animations, loading states, error handling, optimization |
| **Total**                  | **12 weeks** | **Complete Event Management System**                     |

---

## 🎯 Success Checklist

### MVP Requirements:

- [ ] User, Vendor, Admin can register and login
- [ ] Admin can manage users and vendors
- [ ] Vendor can add, edit, delete products
- [ ] User can browse products by category
- [ ] User can add products to cart
- [ ] User can checkout and place order
- [ ] Vendor can view and update order status
- [ ] Admin can view all orders
- [ ] Email notifications on key actions
- [ ] Responsive on all devices
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] Deployed to production

### Post-MVP Enhancements:

- [ ] Product ratings and reviews
- [ ] Advanced search and filters
- [ ] Wishlist
- [ ] Payment gateway integration
- [ ] Real-time notifications (WebSocket)
- [ ] Chat between user and vendor
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

---

**Next Document:** Component Specifications (detailed props, states, and examples for each component)

Would you like me to create the detailed component specifications document next?
