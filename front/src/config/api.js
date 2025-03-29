import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3003/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Initialize token from localStorage if it exists
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['x-auth-token'] = token;
}

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the latest token on each request
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Only redirect to login if not already on login page to avoid redirect loops
      if (!window.location.pathname.includes('/login')) {
        console.log('Authentication error, redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        
        // Use a slight delay to avoid potential race conditions
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }
    }
    return Promise.reject(error);
  }
);

export default api;