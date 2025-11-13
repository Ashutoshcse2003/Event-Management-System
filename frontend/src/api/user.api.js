import axios from './axios';

export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await axios.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await axios.put('/users/profile', userData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await axios.put('/users/change-password', passwordData);
    return response.data;
  },

  // Get user orders
  getOrders: async () => {
    const response = await axios.get('/users/orders');
    return response.data;
  },

  // Get user statistics
  getStats: async () => {
    const response = await axios.get('/users/stats');
    return response.data;
  }
};
