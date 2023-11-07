import axios from './axios';

const BASE_ENDPOINT = '/checkouts/';

const CheckoutsApi = {

    // Create a new checkout
    createCheckout: async (checkoutData) => {
        try {
          const response = await axios.post(BASE_ENDPOINT, checkoutData);
          return response.data;
        } catch (error) {
          throw error;
        }
    },
    
    // Get a list of checkouts
    getCheckouts: async () => {
        try {
            const response = await axios.get(BASE_ENDPOINT);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    // Get a specific checkout by ID
    getCheckoutById: async (checkoutId) => {
        try {
        const response = await axios.get(`${BASE_ENDPOINT}${checkoutId}`);
        return response.data;
        } catch (error) {
        throw error;
        }
    },
    
    // Update an existing checkout
    updateCheckout: async (checkoutId, checkoutData) => {
        try {
        const response = await axios.put(`${BASE_ENDPOINT}${checkoutId}`, checkoutData);
        return response.data;
        } catch (error) {
        throw error;
        }
    },
    
    // Delete a checkout by ID
    deleteCheckout: async (checkoutId) => {
        try {
        const response = await axios.delete(`${BASE_ENDPOINT}${checkoutId}`);
        return response.data;
        } catch (error) {
        throw error;
        }
    },
};

export default CheckoutsApi;