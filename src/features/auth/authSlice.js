import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  registerAPI,
  verifyOtpAPI,
} from "../../services/authService";

// Helper function to safely parse JSON from localStorage
const safeParse = (key) => {
  const item = localStorage.getItem(key);
  if (!item || item === "undefined") return null;
  try {
    const parsed = JSON.parse(item);
    // Ensure we don't return the "OTP verified" message as a user object
    if (parsed && parsed.message && !parsed.id && !parsed._id) return null;
    return parsed;
  } catch (e) {
    return null;
  }
};

const savedToken = localStorage.getItem("token");
const savedUser = safeParse("user");

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return await loginAPI(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login Failed",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      return await registerAPI(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup Failed",
      );
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, thunkAPI) => {
    try {
      return await verifyOtpAPI(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification Failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    token: savedToken && savedToken !== "undefined" ? savedToken : null,
    isAuthenticated: !!(savedToken && savedToken !== "undefined" && savedUser),
    isLoading: false,
    otpEmail: sessionStorage.getItem("otpEmail") || null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.clear();
      sessionStorage.clear();
    },
    // Updates status after Stripe Webhook confirms payment
    setPaymentSuccess: (state) => {
      if (state.user) {
        state.user.status = "active";
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        const userData =
          action.payload.user || action.payload.auth || action.payload.data;
        const tokenData = action.payload.token || (userData && userData.token);

        state.user = userData;
        state.token = tokenData;

        if (tokenData) localStorage.setItem("token", tokenData);
        if (userData) localStorage.setItem("user", JSON.stringify(userData));
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const email =
          action.meta.arg instanceof FormData
            ? action.meta.arg.get("email")
            : action.meta.arg.email;
        state.otpEmail = email;
        sessionStorage.setItem("otpEmail", email);
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;

        // Check if payload contains the actual user profile
        const userData =
          action.payload.user ||
          action.payload.data ||
          (action.payload.id ? action.payload : null);
        const tokenData = action.payload.token || (userData && userData.token);

        // ONLY update state and localStorage if we received a valid user ID or Email
        if (userData && (userData.id || userData._id || userData.email)) {
          state.isAuthenticated = true;
          state.user = userData;
          state.token = tokenData;

          if (tokenData) localStorage.setItem("token", tokenData);
          localStorage.setItem("user", JSON.stringify(userData));
          sessionStorage.removeItem("otpEmail");
        } else {
          // If response is just {"message": "..."}, we don't save it as a user.
          // The component will handle the redirection.
          console.warn(
            "OTP Verified: No user data in response. Redirecting to login might be needed.",
          );
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        },
      );
  },
});

export const { logout, setPaymentSuccess } = authSlice.actions;
export default authSlice.reducer;
