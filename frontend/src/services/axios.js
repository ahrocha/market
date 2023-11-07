import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

const token = localStorage.getItem('token');

if (token) {
  instance.defaults.headers.common['Authorization'] = `Token ${token}`;
}

export default instance
