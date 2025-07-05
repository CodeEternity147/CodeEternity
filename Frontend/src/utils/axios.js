import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://api.codeeternity.com' : 'http://localhost:5000'),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: true // Enable cookies for cross-origin requests
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request data
    // console.log('Request:', {
    //   url: config.url,
    //   method: config.method,
    //   data: config.data,
    //   headers: config.headers
    // });
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic
api.interceptors.response.use(
  (response) => {
    // Log successful response
    // console.log('Response:', {
    //   status: response.status,
    //   data: response.data
    // });
    return response;
  },
  async (error) => {
    // Log error response
    // console.log('Error:', {
    //   status: error.response?.status,
    //   data: error.response?.data,
    //   message: error.message
    // });

    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your connection.'
      });
    }

    // Handle server errors
    if (error.response.status >= 500) {
      // Add retry logic for server errors
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        originalRequest.retryCount = (originalRequest.retryCount || 0) + 1;
        
        // Maximum 3 retries
        if (originalRequest.retryCount <= 3) {
          const delayRetry = new Promise(resolve => {
            setTimeout(resolve, 1000 * originalRequest.retryCount);
          });
          
          await delayRetry;
          return api(originalRequest);
        }
      }
      return Promise.reject({
        message: 'Server error. Please try again later.'
      });
    }

    // Handle validation errors
    if (error.response.status === 400) {
      const message = error.response.data.message || 'Invalid request';
      // console.log("axios" , message)
      return Promise.reject({ message });
    }

    return Promise.reject(error);
  }
);

export default api;