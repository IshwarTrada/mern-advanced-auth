import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/auth";

axios.defaults.withCredentials = true; // Send cookies with every request

// Async thunks for authentication actions
const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      return response.data.user; // Return user data
    } catch (error) {
        console.log(error);
        
      return rejectWithValue(
        error.response?.data?.message || "Error signing up"
      );
    }
  }
);

const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return response.data.user; // Return user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error logging in"
      );
    }
  }
);

const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      return rejectWithValue("Error logging out");
    }
  }
);

const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (verificationCode, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { verificationCode });
      return response.data.user; // Return user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error verifying email"
      );
    }
  }
);

const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      return response.data.user; // Return user data
    } catch (error) {
      return rejectWithValue(null); // Not authenticated
    }
  }
);

const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      return response.data.message; // Return success message
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error sending reset password email"
      );
    }
  }
);

const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      return response.data.message; // Return success message
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error resetting password"
      );
    }
  }
);

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.isCheckingAuth = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export { signup, login, logout, verifyEmail, checkAuth, forgotPassword, resetPassword };

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
