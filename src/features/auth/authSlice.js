// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   loginAPI,
//   registerAPI,
//   verifyOtpAPI,
// } from "../../services/authService";

// /**
//  * Helper function to safely parse JSON from localStorage.
//  */
// const safeParse = (key) => {
//   const item = localStorage.getItem(key);
//   if (!item || item === "undefined") return null;
//   try {
//     const parsed = JSON.parse(item);
//     // Role missing hone par bhi user object ko valid maanein
//     return parsed && (parsed.id || parsed._id) ? parsed : null;
//   } catch (e) {
//     console.error(`Error parsing ${key} from localStorage:`, e);
//     return null;
//   }
// };

// // --- Async Thunks ---

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (data, thunkAPI) => {
//     try {
//       const response = await loginAPI(data);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Login Failed",
//       );
//     }
//   },
// );

// export const registerUser = createAsyncThunk(
//   "auth/signup",
//   async (data, thunkAPI) => {
//     try {
//       const response = await registerAPI(data);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Signup Failed",
//       );
//     }
//   },
// );

// export const verifyOtp = createAsyncThunk(
//   "auth/verifyOtp",
//   async (data, thunkAPI) => {
//     try {
//       const response = await verifyOtpAPI(data);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Verification Failed",
//       );
//     }
//   },
// );

// // --- Slice Definition ---

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: safeParse("user"),
//     token: localStorage.getItem("token") || null,
//     isAuthenticated: !!(localStorage.getItem("token") && safeParse("user")),
//     isLoading: false,
//     otpEmail: sessionStorage.getItem("otpEmail") || null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       localStorage.clear();
//       sessionStorage.clear();
//     },
//     setPaymentSuccess: (state) => {
//       if (state.user) {
//         state.user.status = "active";
//         localStorage.setItem("user", JSON.stringify(state.user));
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handling Registration
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         const email =
//           action.meta.arg instanceof FormData
//             ? action.meta.arg.get("email")
//             : action.meta.arg.email;

//         state.otpEmail = email;
//         sessionStorage.setItem("otpEmail", email);
//       })

//       // Handling OTP Verification
//       .addCase(verifyOtp.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isAuthenticated = true;

//         const userData =
//           action.payload.auth || action.payload.user || action.payload;
//         const tokenData = action.payload.token || userData?.token;

//         if (userData) {
//           state.user = userData;
//           state.token = tokenData;
//           localStorage.setItem("user", JSON.stringify(userData));
//           if (tokenData) localStorage.setItem("token", tokenData);
//         }
//         sessionStorage.removeItem("otpEmail");
//       })

//       // Handling Login
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;

//         // Aapka API response structure: { auth: { id, fullName, email, token }, message: "..." }
//         const userData =
//           action.payload.auth || action.payload.user || action.payload;
//         const tokenData = action.payload.token || userData?.token;

//         if (userData) {
//           // IMPORTANT: Agar backend role nahi bhej raha, toh hume poora object save karna hoga
//           state.user = userData;
//           state.token = tokenData;
//           state.isAuthenticated = true;

//           // LocalStorage sync
//           localStorage.setItem("user", JSON.stringify(userData));
//           if (tokenData) {
//             localStorage.setItem("token", tokenData);
//           }
//         }
//       })

//       // Global Loading State Matchers
//       .addMatcher(
//         (action) => action.type.endsWith("/pending"),
//         (state) => {
//           state.isLoading = true;
//         },
//       )
//       .addMatcher(
//         (action) => action.type.endsWith("/rejected"),
//         (state) => {
//           state.isLoading = false;
//         },
//       );
//   },
// });

// export const { logout, setPaymentSuccess } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  registerAPI,
  verifyOtpAPI,
} from "../../services/authService";

/**
 * Helper function to safely parse JSON from localStorage.
 */
const safeParse = (key) => {
  const item = localStorage.getItem(key);
  if (!item || item === "undefined") return null;
  try {
    const parsed = JSON.parse(item);
    return parsed && (parsed.id || parsed._id) ? parsed : null;
  } catch (e) {
    console.error(`Error parsing ${key} from localStorage:`, e);
    return null;
  }
};

// --- Async Thunks ---

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await loginAPI(data);
      return response;
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
      const response = await registerAPI(data);
      return response;
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
      const response = await verifyOtpAPI(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification Failed",
      );
    }
  },
);

// --- Slice Definition ---

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
    // Action to handle real-time profile updates
    updateUser: (state, action) => {
      if (state.user) {
        // Merge existing state with new data from payload
        state.user = { ...state.user, ...action.payload };
        // Sync with localStorage so data persists on refresh
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    setPaymentSuccess: (state) => {
      if (state.user) {
        state.user.status = "active";
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling Registration
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const email =
          action.meta.arg instanceof FormData
            ? action.meta.arg.get("email")
            : action.meta.arg.email;

        state.otpEmail = email;
        sessionStorage.setItem("otpEmail", email);
      })

      // Handling OTP Verification
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;

        const userData =
          action.payload.auth || action.payload.user || action.payload;
        const tokenData = action.payload.token || userData?.token;

        if (userData) {
          state.user = userData;
          state.token = tokenData;
          localStorage.setItem("user", JSON.stringify(userData));
          if (tokenData) localStorage.setItem("token", tokenData);
        }
        sessionStorage.removeItem("otpEmail");
      })

      // Handling Login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;

        const userData =
          action.payload.auth || action.payload.user || action.payload;
        const tokenData = action.payload.token || userData?.token;

        if (userData) {
          state.user = userData;
          state.token = tokenData;
          state.isAuthenticated = true;

          localStorage.setItem("user", JSON.stringify(userData));
          if (tokenData) {
            localStorage.setItem("token", tokenData);
          }
        }
      })

      // Global Loading State Matchers
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

export const { logout, setPaymentSuccess, updateUser } = authSlice.actions;
export default authSlice.reducer;