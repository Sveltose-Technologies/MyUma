import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  registerAPI,
  verifyOtpAPI,
} from "../../services/authService";

const safeParse = (key) => {
  const item = localStorage.getItem(key);
  if (!item || item === "undefined") return null;
  try {
    const parsed = JSON.parse(item);
    return parsed && (parsed.id || parsed._id) ? parsed : null;
  } catch (e) {
    return null;
  }
};

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
    user: safeParse("user"),
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!(localStorage.getItem("token") && safeParse("user")),
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
    // YE WAPAS ADD KIYA HAI ERROR FIX KARNE KE LIYE
    setPaymentSuccess: (state) => {
      if (state.user) {
        state.user.status = "active";
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER: Signup ke waqt hi data save karein (important for Pricing flow)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const userData = action.payload.auth;
        const tokenData = action.payload.auth?.token;

        if (userData && userData.id) {
          state.user = userData;
          state.token = tokenData;
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", tokenData);
        }

        const email =
          action.meta.arg instanceof FormData
            ? action.meta.arg.get("email")
            : action.meta.arg.email;
        state.otpEmail = email;
        sessionStorage.setItem("otpEmail", email);
      })

      // VERIFY OTP: Yahan authenticate true karein
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;

        const userData = action.payload.auth || state.user;
        if (userData) {
          state.user = userData;
          localStorage.setItem("user", JSON.stringify(userData));
        }
        sessionStorage.removeItem("otpEmail");
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const userData = action.payload.auth || action.payload.user;
        const tokenData = userData?.token || action.payload.token;
        if (userData) {
          state.user = userData;
          state.token = tokenData;
          state.isAuthenticated = true;
          localStorage.setItem("token", tokenData);
          localStorage.setItem("user", JSON.stringify(userData));
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

// Yahan setPaymentSuccess ko export karna zaroori hai
export const { logout, setPaymentSuccess } = authSlice.actions;
export default authSlice.reducer;
