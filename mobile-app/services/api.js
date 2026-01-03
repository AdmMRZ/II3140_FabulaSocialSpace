// API service for mobile app — align with frontend `services/api.js`
import axios from 'axios';

// Default base: try common emulator host, fallback to localhost
const DEFAULT_BASE = 'http://192.168.48.111:8000/api';
// Use EXPO_PUBLIC_API_URL if defined (create a .env file), otherwise use default
const BASE = process.env.EXPO_PUBLIC_API_URL || DEFAULT_BASE;

console.log('API Base URL:', BASE);

const client = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.message || 'Network error occurred';
    error.userMessage = errorMessage;
    return Promise.reject(error);
  }
);

export const getMenus = () => client.get('/menu');

export const postOrder = async (payload) => {
  try {
    const response = await client.post('/order', {
      ...payload,
      table_number: parseInt(payload.table_number),
      total_amount: payload.total_amount
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postTenant = (payload) => client.post('/tenant', payload);
export const postAuthGoogle = (credential) => client.post('/auth/google', { credential });

export default client;
