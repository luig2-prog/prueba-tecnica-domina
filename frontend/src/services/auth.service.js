import axios from 'axios';

const API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001/auth';

const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const authService = {
  register,
  login,
};