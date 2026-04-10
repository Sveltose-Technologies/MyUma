// localStorage / AsyncStorage logic
// utils/storage.js

// 🔐 Save token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// 🔐 Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// ❌ Remove token
export const removeToken = () => {
  localStorage.removeItem("token");
};

// 👤 Save user
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// 👤 Get user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ❌ Clear all
export const clearStorage = () => {
  localStorage.clear();
};

export const setSession = (token, user, expiryTime) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("expiry", expiryTime);
};

export const isSessionExpired = () => {
  const expiry = localStorage.getItem("expiry");
  return !expiry || new Date().getTime() > expiry;
};
