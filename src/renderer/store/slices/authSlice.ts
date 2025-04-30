import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface User {
  id: string;
  email: string;
  display_name: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string | null;
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
  userInfo: User;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
  tokenType: 'bearer',
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<
  { userInfo: User; accessToken: string; refreshToken: string },
  LoginCredentials
>('auth/login', async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  const { user_info, access_token, refresh_token } = response.data;
  return {
    userInfo: {
      id: user_info.user_id,
      email: user_info.email,
      displayName: user_info.display_name,
    },
    accessToken: access_token,
    refreshToken: refresh_token,
  };
});

export const signup = createAsyncThunk<AuthResponse, SignupData>(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/signup', userData);
      const { user_info, access_token, refresh_token, token_type } = response.data;
      return {
        userInfo: {
          id: user_info.user_id,
          email: user_info.email,
          display_name: user_info.display_name,
        },
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenType: token_type,
      };
    } catch (error: any) {
      if (error.response?.data?.detail === 'User with this email already exists') {
        return rejectWithValue('Email already exists');
      }
      return rejectWithValue(error.response?.data?.detail || 'Signup failed');
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_info');
  await api.post('/auth/logout');
});

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
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.userInfo;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
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
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.userInfo;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.tokenType = action.payload.tokenType;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Signup failed';
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.tokenType = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
