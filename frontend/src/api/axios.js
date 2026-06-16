import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:30001"
  //baseURL: 'https://tienda-backend-c4pp.onrender.com',
});

// 👉 interceptor para token automático
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;