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

// Bannner API
export const getBannerAPI = async () => {
  try {
    const response = await API.get("/home-banner/get-all");
    return response.data;
  } catch (error) {
    console.error("Error in getBannerAPI:", error);
    throw error;
  }
};
// end Bannner API

// get profile

export const getProfileAPI = async (id) => {
  const response = await API.get(`/auth/get-by-id/${id}`); // Adjust URL to your backend
  return response.data;
};
// update profile

export const updateProfileAPI = async (id, data) => {
  const response = await API.put(`/auth/update/${id}`, data);

  return response.data;
};

//get all category

export const getCategoriesAPI = async () => {
  try {
    const response = await API.get("/category/get-all"); // Adjust to your actual endpoint
    return response.data; // This returns the whole object { success, categories, etc. }
  } catch (error) {
    console.error("Error in getCategoriesAPI:", error);
    throw error;
  }
};
// get all category

// listing post api
// Function to create a new listing
export const createListingAPI = async (formData) => {
  try {
    const response = await API.post("/newListing/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in createListingAPI:", error);
    throw error;
  }
};
// listing post api

// About us api

export const getAboutUsAPI = async () => {
  try {
    const response = await API.get("/aboutus/get-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching About Us:", error);
    throw error;
  }
};
// About us apiend

// terms and condition api
export const getTermsAPI = async () => {
  try {
    const response = await API.get("/termcondition/get-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching Terms:", error);
    throw error;
  }
};

// privacy policy api
export const getPrivacyPolicyAPI = async () => {
  try {
    const response = await API.get("/privacy-policy/get-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
    throw error;
  }
};

// footer api
export const getFooterAPI = async () => {
  try {
    const response = await API.get("/footer-text/get-all");
    return response?.data?.footer;
  } catch (error) {
    console.error("Error fetching Footer:", error);
    throw error;
  }
};

// plans api
export const getPlansAPI = async () => {
  try {
    const response = await API.get("/pricing/get-all"); // Adjust to your actual endpoint
    return response.data; // This returns the whole object { success, plans, etc. }
  } catch (error) {
    console.error("Error in getPlansAPI:", error);
    throw error;
  }
};
