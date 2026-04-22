import axios, { AxiosInstance, AxiosError } from 'axios';

// API configuration
const API_GATEWAY_BASE = 'http://localhost:8080';
const AUTH_SERVICE_BASE = 'http://localhost:8085';
const PRODUCT_SERVICE_BASE = 'http://localhost:8081';
const CART_SERVICE_BASE = 'http://localhost:8082';
const ORDER_SERVICE_BASE = 'http://localhost:8083';

// Create axios instance for each service
const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add JWT token
  client.interceptors.request.use(
    (config) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle token refresh
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await axios.post(`${AUTH_SERVICE_BASE}/api/auth/refresh`, {
            refreshToken,
          });

          const { access_token, refresh_token } = response.data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);

          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return client(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

// Export API clients
export const authApi = createApiClient(AUTH_SERVICE_BASE);
export const productApi = createApiClient(PRODUCT_SERVICE_BASE);
export const cartApi = createApiClient(CART_SERVICE_BASE);
export const orderApi = createApiClient(ORDER_SERVICE_BASE);

// Helper function to get common API configurations
export const getAuthHeader = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};
