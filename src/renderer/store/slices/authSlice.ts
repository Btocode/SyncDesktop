import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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
  access_token: string;
  refresh_token: string;
  token_type: string;
}

const initialState: AuthState = {
  user: null,
  access_token: localStorage.getItem('auth_token'),
  refresh_token: localStorage.getItem('refresh_token'),
  token_type: 'bearer',
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<
  { user_info: User; access_token: string; refresh_token: string },
  LoginCredentials
>('auth/login', async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  const { user_info, access_token, refresh_token } = response.data;
  return { user_info, access_token, refresh_token };
});

export const signup = createAsyncThunk<AuthResponse, SignupData>(
  'auth/signup',
  async (userData) => {
    const response = await api.post<AuthResponse>('/auth/signup', userData);
    const { access_token, refresh_token, token_type } = response.data;
    localStorage.setItem('auth_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    return { access_token, refresh_token, token_type };
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
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
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.access_token = action.payload.access_token;
          state.refresh_token = action.payload.refresh_token;
          state.token_type = action.payload.token_type;
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.access_token = action.payload.access_token;
          state.refresh_token = action.payload.refresh_token;
          state.token_type = action.payload.token_type;
        },
      )
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Signup failed';
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
