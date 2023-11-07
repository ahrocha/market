import axios from './axios';

const BASE_ENDPOINT = '/products/';

const ProductsApi = {
  // Create a new product
  createProduct: async (productData) => {
    try {
      const response = await axios.post(BASE_ENDPOINT, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a list of products
  getProducts: async () => {
    try {
      const response = await axios.get(BASE_ENDPOINT);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific product by ID
  getProductById: async (productId) => {
    try {
      const response = await axios.get(`${BASE_ENDPOINT}${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update an existing product
  updateProduct: async (productId, productData) => {
    try {
      const response = await axios.put(`${BASE_ENDPOINT}${productId}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a product by ID
  deleteProduct: async (productId) => {
    try {
      const response = await axios.delete(`${BASE_ENDPOINT}${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ProductsApi;
