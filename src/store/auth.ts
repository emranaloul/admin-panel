import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from 'services/Auth';
import { AuthPayload } from 'types';
import { setSnackbar } from './snackbar';

const initialState: {
  loggedIn: boolean;
  user?: AuthPayload;
  isLoading: boolean;
  isLoggingIn: boolean;
} = {
  loggedIn: false,
  user: undefined,
  isLoading: false,
  isLoggingIn: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loggedIn = true;
      state.user = payload;
      state.isLoggingIn = false;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loggedIn = false;
      state.isLoggingIn = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const login = createAsyncThunk<
  AuthPayload | undefined,
  { username: string; password: string }
>('auth/login', async (payload, { dispatch }) => {
  try {
    const response = await authService.login(payload.username, payload.password);
    return response;
  } catch (error) {
    dispatch(setSnackbar({ color: 'error', title: 'login error', content: error as string }));
  }
});
