import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface User {
  id: string;
  email: string;
  display_name: string;
}

interface AuthState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  token_type: string | null;
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
  user_info: {
    user_id: string;
    email: string;
    display_name: string;
  };
  access_token: string;
  refresh_token: string;
  token_type: string;
}

const initialState: AuthState = {
  user: null,
  access_token: localStorage.getItem('access_token'),
  refresh_token: localStorage.getItem('refresh_token'),
  token_type: 'bearer',
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<
  { user_info: User; access_token: string; refresh_token: string },
  LoginCredentials
>('auth/login', async (credentials) => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  const { user_info, access_token, refresh_token } = response.data;
  return {
    user_info: {
      id: user_info.user_id,
      email: user_info.email,
      display_name: user_info.display_name,
    },
    access_token,
    refresh_token,
  };
});

export const signup = createAsyncThunk<AuthResponse, SignupData>(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/signup', userData);
      const { user_info, access_token, refresh_token, token_type } = response.data;
      return {
        user_info: {
          user_id: user_info.user_id,
          email: user_info.email,
          display_name: user_info.display_name,
        },
        access_token,
        refresh_token,
        token_type,
      };
    } catch (error: any) {
      if (
        error.response?.data?.detail === 'User with this email already exists'
      ) {
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
        state.user = action.payload.user_info;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
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
        state.user = action.payload.user_info;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.token_type = action.payload.token_type;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Signup failed';
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.access_token = null;
        state.refresh_token = null;
        state.token_type = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
