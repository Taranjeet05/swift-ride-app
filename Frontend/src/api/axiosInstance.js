import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
});

API.interceptors.request.use((config) => {
  const tokenKey = config.tokenKey || "User_Token_Key"; // default to user
  const token = localStorage.getItem(tokenKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
