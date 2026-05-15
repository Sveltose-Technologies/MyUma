import API from "./apiClient";

// services/authService.js

const IMAGE_BASE_URL = "https://nrislaw.rxchartsquare.com"; // Domain without trailing slash

export const getImgURL = (imagePath) => {
  // 1. Check if path is null or empty
  if (!imagePath || imagePath.trim() === "") {
    return "https://placehold.co/400x300?text=No+Image";
  }

  // 2. IMPORTANT: .trim() removes that extra space at the end (".png " -> ".png")
  const cleanPath = imagePath.trim();

  // 3. If it's already a full URL, return it
  if (cleanPath.startsWith("http")) return cleanPath;

  // 4. Ensure path starts with a "/"
  const formattedPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;

  // 5. Final URL: https://nrislaw.rxchartsquare.com/uploads/...
  return `${IMAGE_BASE_URL}${formattedPath}`;
};
// --- Auth APIs ---
export const loginAPI = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  console.log("login", response);

  return response.data;
};

export const registerAPI = async (userData) => {
  const response = await API.post("/auth/signup", userData);
  console.log("register", response.data);

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

// --- Logo APIs ---
export const getLogoAPI = async () => {
  try {
    const response = await API.get("/logo/get-all");
    // Based on your snippet, the data is in response.data
    return response.data;
  } catch (error) {
    console.error("Error fetching logo:", error);
    throw error;
  }
};

export const getAllUsersAPI = async () => {
  const response = await API.get("/auth/get-all-users");
  return response.data; // This returns { message, count, users: [...] }
};

export const getAllOwnersAPI = async () => {
  const response = await API.get("/auth/get-all-owner");
  return response.data; // This returns { message, count, owners: [...] }
};
// Add to services/authService.js
export const addFavoriteAPI = async (data) => {
  const response = await API.post("/favorite/add", data);
  return response.data;
};

export const deleteFavoriteAPI = async (id) => {
  const response = await API.delete(`/favorite/delete/${id}`);
  return response.data;
};

export const getFavoritesByUserAPI = async (userId) => {
  const response = await API.get(`/favorite/get-by-user/${userId}`);
  return response.data;
};
// --- Updated Chat APIs in authService.js ---

export const sendMessageAPI = async (data) => {
  const response = await API.post("/chat/send", data);
  return response.data;
};

// 1. History for User <-> Owner
export const getChatHistoryAPI = async (userId, ownerId) => {
  const response = await API.get(`/chat/get-by-user-owner/${userId}/${ownerId}`);
  return response.data; 
};

// 2. History for Admin <-> Owner (New Endpoint)
export const getChatAdminOwnerHistoryAPI = async (adminId, ownerId) => {
  const response = await API.get(`/chat/get-by-admin-owner/${adminId}/${ownerId}`);
  return response.data;
};

// 3. General history for Admin (New Endpoint)
export const getChatByAdminAPI = async (adminId) => {
  const response = await API.get(`/chat/get-by-admin/${adminId}`);
  return response.data;
};

export const deleteChatMessageAPI = async (id) => {
  const response = await API.delete(`/chat/delete/${id}`);
  return response.data;
};

// --- Auth List APIs ---
export const getAllAuthsAPI = async () => {
  const response = await API.get("/auth/get-all");
  return response.data;
};

