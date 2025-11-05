import axios from 'axios';

const BASE = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000/api';

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