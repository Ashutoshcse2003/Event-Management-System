# Event Mart - Full Stack E-Commerce Platform

A modern full-stack e-commerce platform built with React (frontend) and Node.js/Express (backend) with in-memory database storage.

## 🚀 Features

- **Multi-Role Authentication**: User, Vendor, and Admin roles
- **Product Management**: Browse products across multiple categories (Electronics, Fashion, Home, Books, Sports)
- **Shopping Cart**: Add to cart, manage quantities, checkout
- **Order Management**: Place orders, track status, view history
- **Vendor Dashboard**: Vendors can manage their products and view transactions
- **Admin Panel**: Manage users, vendors, and approve vendor registrations
- **Receipt Generation**: Download and print order receipts

## 🏗️ Architecture

- **Frontend**: React 18, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, JWT Authentication, In-Memory Database
- **No Database Required**: Uses in-memory storage (no MongoDB installation needed)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
cd "d:\Coding World\MyPractices\Ashu"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (already done)
npm install

# Start backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

You should see:

```
📦 Using in-memory database (No MongoDB required)
🌱 Seeding database...
✅ Database seeded successfully!
🚀 Server running on port 5000
```

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd "d:\Coding World\MyPractices\Ashu\frontend"

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:5174**

## 🧪 Testing the Connection

Visit: **http://localhost:5174/test-api**

This page will:

- Test backend connection
- Display products from the backend
- Show connection status

## 👤 Login Credentials

### Admin Account

- **Email**: admin@eventmart.com
- **Password**: admin123
- **Role**: Admin

### User Account

- **Email**: rahul@example.com
- **Password**: user123
- **Role**: User

### Vendor Account

- **Email**: vendor1@example.com
- **Password**: vendor123
- **Role**: Vendor

## 📁 Project Structure

```
Ashu/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── api/             # API service files
│   │   │   ├── axios.js     # Axios instance with interceptors
│   │   │   ├── auth.api.js  # Authentication APIs
│   │   │   ├── product.api.js
│   │   │   ├── order.api.js
│   │   │   ├── vendor.api.js
│   │   │   ├── user.api.js
│   │   │   └── admin.api.js
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts
│   │   ├── pages/           # Page components
│   │   └── App.jsx          # Main app component
│   └── package.json
│
└── backend/                  # Node.js backend
    ├── config/              # Configuration files
    ├── middleware/          # Express middleware
    │   └── auth.middleware.js
    ├── models/              # Data models
    │   └── memory.models.js # In-memory database models
    ├── routes/              # API routes
    │   ├── auth.routes.js
    │   ├── product.routes.js
    │   ├── order.routes.js
    │   ├── vendor.routes.js
    │   ├── user.routes.js
    │   └── admin.routes.js
    ├── server.js            # Main server file
    ├── seedData.js          # Initial data seeding
    └── package.json
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Products

- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Vendor only)
- `PUT /api/products/:id` - Update product (Vendor only)
- `DELETE /api/products/:id` - Delete product (Vendor only)

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (Vendor/Admin)
- `GET /api/orders/vendor/all` - Get vendor's orders

### Vendors

- `POST /api/vendors/register` - Register as vendor
- `GET /api/vendors` - Get all vendors
- `GET /api/vendors/:id` - Get single vendor
- `GET /api/vendors/me/profile` - Get vendor profile
- `PUT /api/vendors/me` - Update vendor profile
- `GET /api/vendors/me/products` - Get vendor's products
- `GET /api/vendors/me/stats` - Get vendor statistics

### Admin

- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/status` - Update user status
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/vendors` - Get all vendors
- `PUT /api/admin/vendors/:id/approve` - Approve vendor
- `GET /api/admin/products` - Get all products
- `GET /api/admin/orders` - Get all orders

## 🎯 User Flows

### User Flow

1. **Signup/Login** → Home Page
2. **Browse Products** → VendorList page
3. **Add to Cart** → Cart page
4. **Checkout** → Checkout page
5. **Order Success** → OrderSuccess page (download/print receipt)
6. **Order Status** → Track order

### Vendor Flow

1. **Signup/Login** → Vendor Dashboard
2. **Your Items** → View/manage products
3. **Add New Item** → Create new product
4. **Transactions** → View orders and revenue

### Admin Flow

1. **Login** → Admin Panel
2. **Manage Users** → View/suspend/delete users
3. **Manage Vendors** → Approve/reject vendor registrations
4. **Dashboard** → View statistics and recent orders

## 📊 Sample Data

The backend automatically seeds with:

- **8 Users** (1 admin, 2 regular users, 5 vendor users)
- **5 Vendors** (Electronics, Fashion, Home, Books, Sports)
- **15 Products** (3 products per vendor)

## 🔧 Development

### Backend Development

```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development

```bash
cd frontend
npm run dev  # Vite dev server with HMR
```

## 🐛 Troubleshooting

### Backend not connecting

1. Check if backend is running on port 5000
2. Run: `cd backend && npm run dev`

### Frontend API errors

1. Check if frontend is on http://localhost:5174
2. Check browser console for CORS errors
3. Verify backend is running

### Test API connection

Visit: http://localhost:5174/test-api

## 📝 Notes

- **No MongoDB Required**: This version uses in-memory storage
- **Data Persistence**: Data is reset when backend server restarts
- **JWT Authentication**: Tokens stored in localStorage
- **CORS Enabled**: Frontend (5174) can access Backend (5000)

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Rate limiting on API endpoints
- Helmet.js for security headers
- Role-based access control

## 🚀 Production Deployment

For production, you would:

1. Replace in-memory database with MongoDB/PostgreSQL
2. Set proper environment variables
3. Enable HTTPS
4. Configure production CORS origins
5. Set secure JWT secrets
6. Enable production optimizations

## 📞 Support

For issues or questions:

1. Check the test API page: http://localhost:5174/test-api
2. Check backend logs in terminal
3. Check browser console for frontend errors

## 📜 License

This project is for educational purposes.

---

**Happy Coding! 🎉**
