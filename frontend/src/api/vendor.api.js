import axios from './axios';

export const vendorAPI = {
  // Register as vendor
  registerVendor: async (vendorData) => {
    const response = await axios.post('/vendors/register', vendorData);
    return response.data;
  },

  // Get all vendors
  getAllVendors: async (params = {}) => {
    const response = await axios.get('/vendors', { params });
    return response.data;
  },

  // Get single vendor
  getVendor: async (id) => {
    const response = await axios.get(`/vendors/${id}`);
    return response.data;
  },

  // Get current vendor profile
  getMyProfile: async () => {
    const response = await axios.get('/vendors/me/profile');
    return response.data;
  },

  // Update vendor profile
  updateProfile: async (vendorData) => {
    const response = await axios.put('/vendors/me', vendorData);
    return response.data;
  },

  // Get vendor's products
  getMyProducts: async () => {
    const response = await axios.get('/vendors/me/products');
    return response.data;
  },

  // Get vendor statistics
  getMyStats: async () => {
    const response = await axios.get('/vendors/me/stats');
    return response.data;
  }
};
