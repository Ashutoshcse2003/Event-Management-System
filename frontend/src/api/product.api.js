import axios from './axios';

export const productAPI = {
  // Get all products
  getAllProducts: async (params = {}) => {
    const response = await axios.get('/products', { params });
    return response.data;
  },

  // Get single product
  getProduct: async (id) => {
    const response = await axios.get(`/products/${id}`);
    return response.data;
  },

  // Create product (vendor only)
  createProduct: async (productData) => {
    const response = await axios.post('/products', productData);
    return response.data;
  },

  // Update product (vendor only)
  updateProduct: async (id, productData) => {
    const response = await axios.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product (vendor only)
  deleteProduct: async (id) => {
    const response = await axios.delete(`/products/${id}`);
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await axios.get('/products/categories/list');
    return response.data;
  }
};
