import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskAPI = {
  // List all tasks
  getTasks: async () => {
    const response = await api.get('/tasks/');
    return response.data;
  },

  // Create a new task
  createTask: async (data) => {
    const response = await api.post('/tasks/', data);
    return response.data;
  },

  // Get a specific task
  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}/`);
    return response.data;
  },

  // Update a task (full update)
  updateTask: async (id, data) => {
    const response = await api.put(`/tasks/${id}/`, data);
    return response.data;
  },

  // Toggle task completion status
  toggleTaskStatus: async (id, completed) => {
    const response = await api.patch(`/tasks/${id}/`, { completed });
    return response.data;
  },

  // Delete a task
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}/`);
  },
};

export default api;
