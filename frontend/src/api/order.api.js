import axios from "./axios";

export const orderAPI = {
  // Create order
  createOrder: async (orderData) => {
    const response = await axios.post("/orders", orderData);
    return response.data;
  },

  // Get user's orders
  getUserOrders: async (status = null) => {
    const url = status ? `/orders?status=${status}` : "/orders";
    const response = await axios.get(url);
    return response.data;
  },

  // Get single order
  getOrder: async (id) => {
    const response = await axios.get(`/orders/${id}`);
    return response.data;
  },

  // Update order status (vendor/admin)
  updateOrderStatus: async (id, statusData) => {
    const response = await axios.put(`/orders/${id}/status`, statusData);
    return response.data;
  },

  // Accept order (vendor)
  acceptOrder: async (id) => {
    const response = await axios.put(`/orders/${id}/status`, {
      action: "accept",
    });
    return response.data;
  },

  // Reject order (vendor)
  rejectOrder: async (id, reason = "") => {
    const response = await axios.put(`/orders/${id}/status`, {
      action: "reject",
      reason,
    });
    return response.data;
  },

  // Cancel order (user)
  cancelOrder: async (id) => {
    const response = await axios.put(`/orders/${id}/cancel`);
    return response.data;
  },

  // Get vendor's orders (vendor only)
  getVendorOrders: async (status = null) => {
    const url = status
      ? `/orders/vendor/all?status=${status}`
      : "/orders/vendor/all";
    const response = await axios.get(url);
    return response.data;
  },

  // Get vendor's pending orders (vendor only)
  getVendorPendingOrders: async () => {
    const response = await axios.get("/orders/vendor/pending");
    return response.data;
  },
};
