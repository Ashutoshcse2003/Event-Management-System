# MongoDB Atlas Setup Guide

## ✅ Your Connection String is Configured!

**Connection String:**

```
mongodb+srv://shivaupadhayay437_db_user:J54MNB1DkoGrYEnO@cluster0.q4muz9p.mongodb.net/eventmart_ecommerce
```

## 🔧 Important Steps to Complete:

### 1. **Network Access (IP Whitelist)**

Go to MongoDB Atlas Dashboard:

1. Click on **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. For testing, choose **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Or add your specific IP address
5. Click **Confirm**

⚠️ **Important:** Your connection will fail if your IP is not whitelisted!

### 2. **Database User Access**

Verify user permissions:

1. Go to **Database Access** (left sidebar)
2. Check user: `shivaupadhayay437_db_user`
3. Ensure it has **"Read and write to any database"** privilege
4. Password: `J54MNB1DkoGrYEnO`

### 3. **Cluster Status**

1. Go to **Database** (left sidebar)
2. Ensure Cluster0 shows status: **"Active"** (green)
3. If it's paused, click **"Resume"**

## 🧪 Test Your Connection

Run the test script:

```bash
test-atlas-connection.bat
```

This will verify:

- ✅ Connection to MongoDB Atlas
- ✅ Database access
- ✅ Network connectivity
- ✅ Authentication

## 🚀 Start the Application

Once connection is successful:

```bash
start.bat
```

The backend will:

1. Connect to MongoDB Atlas
2. Create `eventmart_ecommerce` database
3. Seed initial data (8 users, 5 vendors, 15 products)
4. Start on port 5000

## 📊 View Your Data in MongoDB Compass

### Download MongoDB Compass

1. Visit: https://www.mongodb.com/try/download/compass
2. Download and install

### Connect with Compass

1. Open MongoDB Compass
2. Paste your connection string:
   ```
   mongodb+srv://shivaupadhayay437_db_user:J54MNB1DkoGrYEnO@cluster0.q4muz9p.mongodb.net/
   ```
3. Click **Connect**
4. You'll see your database: `eventmart_ecommerce`
5. Browse collections:
   - users
   - vendors
   - products
   - orders

## 🔍 MongoDB Atlas Dashboard

### View Collections Online

1. Go to: https://cloud.mongodb.com
2. Login to your account
3. Click on your cluster: **Cluster0**
4. Click **"Browse Collections"**
5. Select database: **eventmart_ecommerce**
6. View your data in real-time!

## ⚠️ Troubleshooting

### Connection Timeout

- Check IP whitelist in Network Access
- Allow 0.0.0.0/0 for testing

### Authentication Failed

- Verify username and password
- Check Database Access permissions

### Cluster Not Found

- Ensure cluster is not paused
- Check cluster name is correct

### Internet Issues

- Verify internet connection
- Check firewall settings

## 📝 What Happens When You Start

```
1. Backend connects to MongoDB Atlas
2. Creates database: eventmart_ecommerce
3. Creates collections:
   - users (with admin, user, vendor accounts)
   - vendors (5 stores)
   - products (15 items)
   - orders (empty, will populate with user purchases)

4. Data Flow:
   User Order → MongoDB → Vendor Dashboard → Admin Panel
   All in real-time!
```

## 🎯 Database Structure

**Collections:**

- **users**: User accounts (admin, users, vendors)
- **vendors**: Vendor store information
- **products**: Product catalog with pricing & stock
- **orders**: Order history with customer info & items

**Relationships:**

- Products → Vendor (vendorId)
- Orders → User (userId)
- Orders → Products (productId in items array)
- Vendors → User (userId)

## ✅ Quick Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] IP address whitelisted (0.0.0.0/0 for testing)
- [ ] Database user has read/write permissions
- [ ] Connection string in .env file
- [ ] Test connection: `test-atlas-connection.bat`
- [ ] Start application: `start.bat`

---

**Your setup is ready! Run `test-atlas-connection.bat` to verify everything works.**
