# E-Commerce Order Flow Testing Guide

This guide will help you test the complete order workflow from user placing an order to vendor accepting/rejecting it.

## Architecture Overview

```
User places order
    ↓
Status: PENDING (awaiting vendor confirmation)
    ↓
Stock reduced immediately
Vendor revenue updated
    ↓
Vendor sees order in "Pending Orders" tab
    ↓
Vendor Actions:
├─ ACCEPT → Status: CONFIRMED (order proceeds)
└─ REJECT → Status: CANCELLED (stock restored, revenue reversed)
    ↓
User sees real-time status updates
Admin sees all orders and statistics
```

## Prerequisites

1. MongoDB Atlas is connected (check `.env` file)
2. Both frontend and backend are running:
   ```cmd
   cd d:\Coding World\MyPractices\Ashu
   start.bat
   ```

## Test Accounts

### User Account

- Email: `rahul@example.com`
- Password: `user123`
- Role: Customer

### Vendor Account

- Email: `vendor1@example.com`
- Password: `vendor123`
- Store: TechGear Pro

### Admin Account

- Email: `admin@eventmart.com`
- Password: `admin123`
- Role: Administrator

## Testing Steps

### 1. Test Order Creation (User Side)

1. **Login as User:**

   - Navigate to: http://localhost:5174/login
   - Login with `rahul@example.com` / `user123`

2. **Browse Products:**

   - Go to Products page
   - Find products from TechGear Pro vendor
   - Add 2-3 items to cart

3. **Place Order:**

   - Go to Cart page
   - Click "Proceed to Checkout"
   - Fill in delivery details
   - Click "Place Order"

4. **Verify Order Creation:**
   - Order should be created with status "Pending Confirmation"
   - You should see a success message
   - Check Order Status page: http://localhost:5174/order-status
   - Verify:
     - Order shows "Pending Confirmation" badge (yellow)
     - Message: "Waiting for vendor confirmation"
     - Cancel Order button should be visible
     - Latest Update shows: "Order placed, waiting for vendor confirmation"

### 2. Test Vendor Order View (Vendor Side)

1. **Logout and Login as Vendor:**

   - Logout from user account
   - Login with `vendor1@example.com` / `vendor123`

2. **Check Pending Orders:**
   - Navigate to: http://localhost:5174/vendor/transactions
   - You should see two tabs:
     - **Pending Orders** - Orders awaiting your action
     - **All Orders** - Complete order history
3. **Verify Pending Order Display:**

   - Click "Pending" tab
   - Your order should appear here
   - Verify displayed information:
     - Order ID (last 8 characters)
     - Customer name, phone, email, address
     - Order items with quantities
     - Total amount
     - Order date/time
     - Two action buttons: "Accept Order" and "Reject Order"

4. **Check Statistics:**
   - Dashboard should show updated statistics:
     - Pending: 1 (or more)
     - Confirmed: Previous count
     - Processing: Previous count
     - Shipped: Previous count
     - Delivered: Previous count
     - Cancelled: Previous count

### 3. Test Order Acceptance (Vendor Action)

1. **Accept the Order:**

   - Click "Accept Order" button
   - Should see success toast: "✅ Order accepted successfully"
   - Order should disappear from Pending tab
   - Check "All Orders" tab - order status changed to "Confirmed"
   - Statistics updated: Pending -1, Confirmed +1

2. **Verify Stock (Optional):**
   - Go to Vendor Dashboard
   - Check product stock is reduced
   - Total revenue increased

### 4. Test Order Rejection (Vendor Action)

**Note:** Place another order from user account first to test rejection

1. **Reject the Order:**

   - In Pending Orders tab, click "Reject Order"
   - Enter rejection reason (optional prompt)
   - Should see toast: "❌ Order rejected"
   - Order moves to Cancelled status

2. **Verify Stock Restoration:**
   - Product stock should be restored
   - Vendor revenue should be reversed
   - Order appears in All Orders with "Cancelled" status

### 5. Test User Order Tracking (User Side)

1. **Login as User Again:**

   - Logout from vendor account
   - Login with user credentials

2. **Check Order Status Page:**

   - Navigate to: http://localhost:5174/order-status
   - Click "Refresh" button to reload orders

3. **Verify Accepted Order:**

   - Status badge: "Confirmed" (green)
   - Latest Update: "Order confirmed by vendor"
   - Cancel button should still be visible (can cancel confirmed orders)
   - No "Waiting for vendor confirmation" message

4. **Verify Rejected Order:**
   - Status badge: "Cancelled" (red)
   - No cancel button
   - Latest Update: Shows cancellation reason

### 6. Test Order Cancellation (User Action)

1. **Cancel an Order:**

   - Find a Pending or Confirmed order
   - Click "Cancel Order" button
   - Confirm the cancellation dialog
   - Should see: "Order cancelled successfully"

2. **Verify Cancellation:**
   - Order status changes to "Cancelled"
   - Stock is restored
   - Revenue is reversed
   - Order moves to cancelled section

### 7. Test Admin Dashboard (Admin View)

1. **Login as Admin:**

   - Logout and login with admin credentials
   - Navigate to Admin Dashboard

2. **Verify Admin View:**
   - Should see all orders from all vendors
   - Statistics show complete counts
   - Can see order flow across entire platform

## Expected Behaviors

### Order Status Flow

```
PENDING → (Vendor Accepts) → CONFIRMED → PROCESSING → SHIPPED → DELIVERED
    ↓
(Vendor Rejects or User Cancels)
    ↓
CANCELLED (with stock restoration)
```

### Stock Management

1. **Order Creation:**

   - Stock decreased immediately
   - Product status becomes "out_of_stock" if stock = 0

2. **Order Cancellation:**

   - Stock restored
   - Product status returns to "active" if stock > 0

3. **Revenue Tracking:**
   - Vendor revenue increased on order creation
   - Vendor revenue decreased on cancellation

### UI Indicators

#### Status Colors:

- **Pending:** Yellow badge
- **Confirmed:** Green badge
- **Processing:** Blue badge
- **Shipped:** Purple badge
- **Delivered:** Green badge
- **Cancelled:** Red badge

#### Buttons Visibility:

- **User:**

  - Cancel button: Visible for Pending/Confirmed orders
  - Hidden for Processing/Shipped/Delivered/Cancelled

- **Vendor:**
  - Accept/Reject buttons: Only for Pending orders
  - Hidden for all other statuses

## API Endpoints Used

### User APIs:

- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders?status=pending` - Filter by status
- `PUT /api/orders/:id/cancel` - Cancel order

### Vendor APIs:

- `GET /api/orders/vendor/all` - Get all vendor orders
- `GET /api/orders/vendor/all?status=pending` - Filter vendor orders
- `GET /api/orders/vendor/pending` - Get pending orders only
- `PUT /api/orders/:id/status` - Update order status
  - With `action: 'accept'` - Accept order
  - With `action: 'reject'` - Reject order

### Admin APIs:

- `GET /api/admin/orders` - Get all platform orders

## Troubleshooting

### Issue: Order not appearing in vendor panel

**Solution:** Check that vendor ID matches the product vendor

### Issue: Stock not restoring on cancellation

**Solution:** Check backend logs for errors in stock update logic

### Issue: Frontend shows old data

**Solution:** Click "Refresh" button or reload the page

### Issue: Order creation fails

**Solution:**

- Check MongoDB connection
- Verify product stock availability
- Check browser console for errors

## Database Verification

You can verify the data flow in MongoDB Atlas:

1. **Login to MongoDB Atlas**
2. **Navigate to Collections**
3. **Check Orders Collection:**

   ```javascript
   // Find pending orders
   { status: "pending" }

   // Find orders by user
   { userId: ObjectId("user_id") }

   // Check tracking info
   { "trackingInfo.updates": { $exists: true } }
   ```

4. **Check Products Collection:**

   ```javascript
   // Verify stock changes
   {
     _id: ObjectId("product_id");
   }
   ```

5. **Check Vendors Collection:**
   ```javascript
   // Verify revenue changes
   {
     _id: ObjectId("vendor_id");
   }
   ```

## Success Criteria

✅ User can place orders successfully
✅ Orders show as "Pending" initially
✅ Vendor receives pending order notifications
✅ Vendor can accept orders (status → Confirmed)
✅ Vendor can reject orders (status → Cancelled, stock restored)
✅ User can cancel Pending/Confirmed orders
✅ Stock management works correctly
✅ Revenue tracking is accurate
✅ Status updates reflect in real-time
✅ Statistics are calculated correctly
✅ All three roles (User/Vendor/Admin) see appropriate views

## Next Steps

After successful testing, consider implementing:

1. **Real-time Notifications:**

   - WebSocket integration
   - Push notifications for order updates

2. **Email Notifications:**

   - Order confirmation emails
   - Vendor notification emails
   - Status update emails

3. **Advanced Features:**

   - Order rating and reviews
   - Partial cancellations
   - Order modifications
   - Return/refund requests

4. **Analytics Dashboard:**
   - Revenue charts
   - Order trends
   - Vendor performance metrics
   - Customer insights

## Support

If you encounter any issues during testing:

1. Check browser console for errors
2. Check backend terminal for server logs
3. Verify MongoDB Atlas connection
4. Ensure all dependencies are installed
5. Restart servers if needed: `restart.bat`
