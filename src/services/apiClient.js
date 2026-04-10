const API = axios.create({
  baseURL: "https://nrislaw.rxchartsquare.com/", // keep empty if using Vite proxy
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
