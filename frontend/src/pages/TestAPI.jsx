import React, { useState, useEffect } from 'react';
import { productAPI } from '../api/product.api';

const TestAPI = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    testAPI();
  }, []);

  const testAPI = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAllProducts();
      console.log('API Response:', response);
      setProducts(response.data.products);
      setError(null);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧪 API Test Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Backend Connection Status</h2>
          {loading && (
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <p>Testing API connection...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-600 font-semibold">❌ Connection Failed</p>
              <p className="text-red-500 text-sm mt-1">{error}</p>
              <p className="text-gray-600 text-sm mt-2">
                Make sure the backend server is running on http://localhost:5000
              </p>
            </div>
          )}
          
          {!loading && !error && (
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <p className="text-green-600 font-semibold">✅ Connected Successfully!</p>
              <p className="text-gray-600 text-sm mt-1">
                Found {products.length} products in the database
              </p>
            </div>
          )}
        </div>

        {!loading && !error && products.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">📦 Products from Backend</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.slice(0, 6).map((product) => (
                <div key={product._id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-purple-600 font-bold">₹{product.price}</span>
                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAPI;
