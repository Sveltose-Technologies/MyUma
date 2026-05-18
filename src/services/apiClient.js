import axios from "axios";

const API = axios.create({
  baseURL: "https://nrislaw.rxchartsquare.com",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 

  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Login/Signup ke liye token null hone par log mat dikhao
  if (!token && !config.url.includes("/auth")) {
    console.warn("No token found for request:", config.url);
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;