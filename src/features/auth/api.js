// import API from "https://nrislaw.rxchartsquare.com/"; // Path to your main axios instance

import API from "../../services/apiClient";

// ✅ LOGIN
export const loginAPI = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

// ✅ REGISTER (SEND OTP)
export const registerAPI = async (userData) => {
  const response = await API.post("/auth/signup", userData);
  return response.data;
};

// ✅ VERIFY OTP
export const verifyOtpAPI = async (data) => {
  const response = await API.post("/auth/verify-otp", data);
  return response.data;
};
export const forgotPasswordAPI = async (data) => {
  const response = await API.post("/auth/forgot-password", data);
  return response.data;
};
