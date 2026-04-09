import API from "../../api/api"; // Path to your main axios instance

export const loginAPI = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

export const registerAPI = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};
