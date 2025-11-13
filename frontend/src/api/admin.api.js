import axios from './axios';

export const adminAPI = {
  // Get dashboard statistics
  getDashboard: async () => {
    const response = await axios.get('/admin/dashboard');
    return response.data;
  },

  // Get all users
  getAllUsers: async (params = {}) => {
    const response = await axios.get('/admin/users', { params });
    return response.data;
  },

  // Update user status
  updateUserStatus: async (id, status) => {
    const response = await axios.put(`/admin/users/${id}/status`, { status });
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await axios.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Get all vendors
  getAllVendors: async (params = {}) => {
    const response = await axios.get('/admin/vendors', { params });
    return response.data;
  },

  // Approve/reject vendor
  approveVendor: async (id, status) => {
    const response = await axios.put(`/admin/vendors/${id}/approve`, { status });
    return response.data;
  },

  // Get all products
  getAllProducts: async (params = {}) => {
    const response = await axios.get('/admin/products', { params });
    return response.data;
  },

  // Get all orders
  getAllOrders: async (params = {}) => {
    const response = await axios.get('/admin/orders', { params });
    return response.data;
  }
};
