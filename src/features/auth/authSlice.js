import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  registerAPI,
  verifyOtpAPI,
} from "../../services/authService";

// Load initial state from local storage to persist session on refresh
const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

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
        error.response?.data?.message || "OTP Verification Failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    token: savedToken,
    isAuthenticated: !!savedToken,
    isLoading: false,
    error: null,
    otpEmail: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.clear();
      sessionStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.auth || action.payload.user;
        state.token = action.payload.token || action.payload.auth?.token;

        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(state.user));
        // Save userId separately for easy access
        const id = state.user?._id || state.user?.id;
        if (id) localStorage.setItem("userId", id);
      })
      // OTP VERIFICATION (Used for registration)
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        const id = action.payload.user?._id || action.payload.user?.id;
        if (id) localStorage.setItem("userId", id);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
