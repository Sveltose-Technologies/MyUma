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
  console.log("data otp", data);

  const response = await API.post("/auth/verify-otp", data);
  console.log("OTP verification response:", response);
  return response.data;
};

// forget password
export const forgotPasswordAPI = async (data) => {
  const response = await API.post("/auth/forgot-password", data);
  return response.data;
};

// reset password Forget Password
export const resetPasswordAPI = async (data) => {
  const response = await API.put("/auth/reset-password", data);
  return response.data;
};

// get profile

export const getProfileAPI = async (id) => {
  const response = await API.get(`/auth/get-by-id/${id}`); // Adjust URL to your backend
  console.log("get profile id Response ", response?.data?.auth);
  return response.data;
};

// update profile
export const updateProfileAPI = async (id, data) => {
  console.log("update Profile INSIDE apiiiii IDD", id);
  console.log("update Profile INSIDE apiiiii DATA", data);

  const response = await API.put(`/auth/update/${id}`, data);
  console.log("UPDATED APIIII", response);

  return response.data;
};
