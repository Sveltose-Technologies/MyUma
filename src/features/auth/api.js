// import API from "https://nrislaw.rxchartsquare.com/"; // Path to your main axios instance

import API from "../../services/apiClient";

export const loginAPI = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

export const registerAPI = async (userData) => {
  console.log("userData", userData);

  const response = await API.post("auth/signup", userData);
  return response.data;
};
