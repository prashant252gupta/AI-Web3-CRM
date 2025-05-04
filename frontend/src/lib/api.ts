// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',         // ← proxy rewrites /api/* → your Express server
});

// Automatically attach the JWT from localStorage to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
