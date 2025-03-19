import axios from 'axios';

const API_URL = import.meta.env.VITE_TASKS_API_URL || 'http://localhost:3001/tasks';

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const getAllTasks = async (token) => {
  console.log("🚀 ~ getAllTasks ~ token:", token)
  try {
    const response = await axios.get(API_URL, authHeader(token));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const getTask = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, authHeader(token));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const createTask = async (taskData, token) => {
  try {
    const response = await axios.post(API_URL, taskData, authHeader(token));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const updateTask = async (id, taskData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, taskData, authHeader(token));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const deleteTask = async (id, token) => {
  try {
    await axios.delete(`${API_URL}/${id}`, authHeader(token));
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const toggleTaskCompletion = async (id, completed, token) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/toggle`, { completed }, authHeader(token));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const taskService = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
};