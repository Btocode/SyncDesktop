import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData extends LoginCredentials {
  name: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('auth_token'),
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  'auth/login',
  async (credentials) => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('auth_token', token);
    return { token, user };
  },
);

export const signup = createAsyncThunk<AuthResponse, SignupData>(
  'auth/signup',
  async (userData) => {
    const response = await api.post<AuthResponse>('/auth/signup', userData);
    const { token, user } = response.data;
    localStorage.setItem('auth_token', token);
    return { token, user };
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('auth_token');
    await api.post('/auth/logout');
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Signup failed';
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;