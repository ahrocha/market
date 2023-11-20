import axios from 'axios';

const BASE_ENDPOINT = process.env.REACT_APP_BASE_URL + '/types/';

const TypesApi = {
  // Create a new type
  createType: async (typeData) => {
    try {
      const response = await axios.post(BASE_ENDPOINT, typeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a list of types
  getTypes: async () => {
    try {
      const response = await axios.get(BASE_ENDPOINT);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific type by ID
  getTypeById: async (typeId) => {
    try {
      const response = await axios.get(`${BASE_ENDPOINT}${typeId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update an existing type
  updateType: async (typeId, typeData) => {
    try {
      const response = await axios.put(`${BASE_ENDPOINT}${typeId}`, typeData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a type by ID
  deleteType: async (typeId) => {
    try {
      const response = await axios.delete(`${BASE_ENDPOINT}${typeId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default TypesApi;
