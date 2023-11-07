import axios from './axios';

const BASE_ENDPOINT = '/checkouts/';

const CheckoutsApi = {

    createCheckout: async (checkoutData) => {
        try {
          const response = await axios.post(BASE_ENDPOINT, checkoutData);
          return response.data;
        } catch (error) {
          throw error;
        }
    },
    
    getCheckouts: async () => {
        try {
            const options = {"Authorization": `Token ${localStorage.getItem('token')}`};
            const response = await axios.get(BASE_ENDPOINT, {headers: options});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    getCheckoutById: async (checkoutId) => {
        try {
        const response = await axios.get(`${BASE_ENDPOINT}${checkoutId}`);
        return response.data;
        } catch (error) {
        throw error;
        }
    },
    
    updateCheckout: async (checkoutId, checkoutData) => {
        try {
        const response = await axios.put(`${BASE_ENDPOINT}${checkoutId}`, checkoutData);
        return response.data;
        } catch (error) {
        throw error;
        }
    },
    
    deleteCheckout: async (checkoutId) => {
        try {
            const options = {"Authorization": `Token ${localStorage.getItem('token')}`};
            const response = await axios.delete(`${BASE_ENDPOINT}${checkoutId}`, {headers: options});
            return response.data;
        } catch (error) {
        throw error;
        }
    },
};

export default CheckoutsApi;