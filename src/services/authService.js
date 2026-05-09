import API from "./apiClient";

const IMAGE_BASE_URL = "https://nrislaw.rxchartsquare.com/";

export const getImgURL = (imagePath) => {
  if (!imagePath) return "https://placehold.co/400x300?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath;
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  return `${IMAGE_BASE_URL}${cleanPath}`;
};

// --- Auth APIs ---
export const loginAPI = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

export const registerAPI = async (userData) => {
  const response = await API.post("/auth/signup", userData);
  console.log("register",response.data);
  
  return response.data;
};

export const verifyOtpAPI = async (data) => {
  const response = await API.post("/auth/verify-otp", data);
  return response.data;
};

export const forgotPasswordAPI = async (data) => {
  const response = await API.post("/auth/forgot-password", data);
  return response.data;
};

export const resetPasswordAPI = async (data) => {
  const response = await API.put("/auth/reset-password", data);
  return response.data;
};

// --- Blog & Comments ---
export const getBlogDetailsApi = async (id) => {
  const response = await API.get(`/blog/get-by-id/${id}`);
  return response.data;
};

export const sendCommentAPI = async (data) => {
  const response = await API.post("/comment/send", data);
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

export const getSubCategoriesAPI = async () => {
  try {
    const response = await API.get("/subcategory/get-all");
    console.log("Subcategory", response.data);

    return response.data; // Returns { success, subcategories, etc. }
  } catch (error) {
    console.error("Error in getSubCategoriesAPI:", error);
    throw error;
  }
};

// listing post api
// Function to create a new listing

// Add this to your authService.js if not already there
export const getAllListingsApi = async () => {
  const response = await API.get("/newListing/get-all");
  return response.data;
};
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

//src/services/authService
// Blog
export const getBLogsApi = async () => {
  try {
    console.log("API Calling: /blog/get-all"); // 👈 call check

    const response = await API.get("/blog/get-all");

    // 👇 Proper console prints
    console.log("Full Response:", response);
    console.log("Response Data:", response.data);

    return response?.data;
  } catch (error) {
    console.error("Error in getBlogApi:", error);
    throw error;
  }
};

// ==========================================
// RATING / REVIEWS API METHODS
// ==========================================

// 1. Add Rating
export const addRatingAPI = async (data) => {
  try {
    const response = await API.post("/rating/add", data);
    return response.data;
  } catch (error) {
    console.error("Error in addRatingAPI:", error);
    throw error;
  }
};

// 2. Get All Ratings
export const getRatingsAPI = async () => {
  try {
    console.log("API CALL: /rating/get-all");
    const response = await API.get("/rating/get-all");
    console.log("API RESPONSE: /rating/get-all | Data:", response.data);
    return response.data; // Returns { status, count, data: [] }
  } catch (error) {
    console.error("Error in getRatingsAPI:", error);
    throw error;
  }
};

// 3. Delete Rating
export const deleteRatingAPI = async (id) => {
  try {
    const response = await API.delete(`/rating/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in deleteRatingAPI:", error);
    throw error;
  }
};

// ✅ GET ALL CONVERSATIONS (Contact List)
export const getChatListAPI = async () => {
  const response = await API.get("/chat/conversations");
  return response.data;
};

// ✅ GET MESSAGE HISTORY WITH A SPECIFIC USER
export const getChatHistoryAPI = async (receiverId) => {
  const response = await API.get(`/chat/history/${receiverId}`);
  return response.data;
};

// ✅ SEND CONTACT MESSAGE
export const sendContactAPI = async (contactData) => {
  try {
    const response = await API.post("/contactus/send", contactData);
    return response.data;
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
};

// Testimonial GET API
export const getTestimonialsAPI = async () => {
  try {
    const response = await API.get("/testimonial/get-all");
    // Returns the array of testimonials
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

// ==========================================
// REVIEW API METHODS
// ==========================================

export const addReviewAPI = async (data) => {
  try {
    const response = await API.post("/review/add", data);
    return response.data;
  } catch (error) {
    console.error("Error in addReviewAPI:", error);
    throw error;
  }
};

export const getReviewsAPI = async () => {
  try {
    const response = await API.get("/review/get-all");
    return response.data;
  } catch (error) {
    console.error("Error in getReviewsAPI:", error);
    throw error;
  }
};

// ==========================================
// BOOK NOW API METHODS
// ==========================================

export const createBookingAPI = async (data) => {
  try {
    const response = await API.post("/booknow/add", data);
    return response.data;
  } catch (error) {
    console.error("Error in createBookingAPI:", error);
    throw error;
  }
};

export const getAllBookingsAPI = async () => {
  try {
    const response = await API.get("/booknow/get-all");
    return response.data;
  } catch (error) {
    console.error("Error in getAllBookingsAPI:", error);
    throw error;
  }
};

export const deleteBookingAPI = async (id) => {
  try {
    const response = await API.delete(`/booknow/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in deleteBookingAPI:", error);
    throw error;
  }
};

export const checkoutAPI = async (data) => {
  try {
    console.log("checkout request data:", data);

    const response = await API.post("/payment/checkout", data);

    console.log("checkout full response:", response);
    console.log("checkout response data:", response.data);

    return response.data;
  } catch (error) {
    console.log("checkout API error:", error);
    throw error;
  }
};

export const getPlansAPI = async () => {
  try {
    const response = await API.get("/pricing/get-all");

    console.log("plans full response:", response);
    console.log("plans response data:", response.data);

    return response.data;
  } catch (error) {
    console.log("get plans API error:", error);
    throw error;
  }
};

// ==========================================
// COMMENT API METHODS
// ==========================================

// Add Comment

// Get All Comments (Optional: Use this if you want to display them below the blog)
export const getAllCommentsAPI = async () => {
  try {
    const response = await API.get("/comment/get-all");
    return response.data;
  } catch (error) {
    console.error("Error in getAllCommentsAPI:", error);
    throw error;
  }
};

// ... other imports

// CORRECT: uses uppercase 'API'
export const getAllSubCategoriesApi = async () => {
  try {
    const response = await API.get("/subcategory/get-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};
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

export const getCategoriesAPI = async () => {
  try {
    const response = await API.get("/category/get-all"); // Adjust to your actual endpoint
    return response.data; // This returns the whole object { success, categories, etc. }
  } catch (error) {
    console.error("Error in getCategoriesAPI:", error);
    throw error;
  }
};