import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const signup = async (userData) => {
  try {
    const response = await axiosClient.post('/user/signup', {
      username: userData.username, 
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axiosClient.post('/user/login', {
      username: userData.username,
      password: userData.password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosClient.post('/user/logout');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token'); 
      localStorage.removeItem('user');
    }
    return response.data;
  } catch (error) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token'); 
      localStorage.removeItem('user');
    }
    throw error;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await axiosClient.get(`/user/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default axiosClient;