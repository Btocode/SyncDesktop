import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_info');
      // Use window.location for Electron
      window.location.hash = '#/login';
    }
    return Promise.reject(error);
  },
);

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

export const setUserInfo = (userInfo: any) => {
  localStorage.setItem('user_info', JSON.stringify(userInfo));
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_info');
  // Use window.location for Electron
  window.location.hash = '#/login';
};

export const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem('user_info');
    if (!userInfo) return null;
    return JSON.parse(userInfo);
  } catch (error) {
    console.error('Error parsing user info:', error);
    return null;
  }
};

export default api;
