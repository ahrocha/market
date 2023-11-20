import axios from 'axios';

const BASE_ENDPOINT = process.env.REACT_APP_BASE_URL + '/login';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_ENDPOINT}`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};