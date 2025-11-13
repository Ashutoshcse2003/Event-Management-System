import axios from './axios';

export const authAPI = {
  // User Signup
  signup: async (userData) => {
    const response = await axios.post('/auth/signup', userData);
    return response.data;
  },

  // User Login
  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  },

  // Get Current User
  getCurrentUser: async () => {
    const response = await axios.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await axios.post('/auth/logout');
    return response.data;
  }
};
