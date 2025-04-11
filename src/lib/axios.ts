import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle 401 Unauthorized - redirect to login except during login attempts
      if (status === 401 && !error.config.url.includes('/auth/login')) {
        localStorage.removeItem('auth_token');
        window.location.href = '/sign-in';
      }

      // Enhanced error with API message if available
      if (data && typeof data === 'object' && 'detail' in data) {
        error.message = data.detail;
      }
    }
    return Promise.reject(error);
  }
);
