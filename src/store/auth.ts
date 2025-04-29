import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from 'services/Auth';
import {
  ApiResponse,
  AuthErrorMessages,
  AuthPayload,
  ErrorResponse,
  LoginDataType,
  LoginResponse,
  User,
} from 'types';
import { setSnackbar } from './snackbar';

const initialState: {
  loggedIn: boolean;
  user?: User;
  isLoading: boolean;
  isLoggingIn: boolean;
} = {
  loggedIn: false,
  user: undefined,
  isLoading: true,
  isLoggingIn: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.clear();
      return { ...initialState, isLoading: false };
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loggedIn = true;
      state.user = payload;
      state.isLoggingIn = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loggedIn = false;
      state.isLoggingIn = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoggingIn = true;
    });
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.loggedIn = true;
      state.user = payload;
      state.isLoggingIn = false;
    });
    builder.addCase(signup.rejected, (state) => {
      state.loggedIn = false;
      state.isLoggingIn = false;
    });
    builder.addCase(signup.pending, (state) => {
      state.isLoggingIn = true;
    });
    builder.addCase(getUserData.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
        state.loggedIn = true;
      }
      state.isLoading = false;
    });
    builder.addCase(getUserData.rejected, (state) => {
      state.loggedIn = false;
      state.isLoading = false;
    });
    builder.addCase(getUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutHandler.fulfilled, (state) => {
      state.loggedIn = false;
      state.user = undefined;
      state.isLoading = false;
    });
    builder.addCase(logoutHandler.rejected, (state) => {
      state.loggedIn = false;
      state.user = undefined;
      state.isLoading = false;
    });
    builder.addCase(logoutHandler.pending, (state) => {
      state.isLoading = true;
    });
  },
});

function getAuthErrorMessage(response: ErrorResponse): string {
  switch (response.message) {
    case 'EMAIL_NOT_FOUND':
      return AuthErrorMessages.EMAIL_NOT_FOUND;
    case 'INVALID_PASSWORD':
      return AuthErrorMessages.INVALID_PASSWORD;
    case 'USER_DISABLED':
      return AuthErrorMessages.USER_DISABLED;
    default:
      return response.message;
  }
}

export const login = createAsyncThunk<User | undefined, LoginDataType>(
  'auth/login',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.login(payload.email, payload.password);
      return response.user;
    } catch (err) {
      const { error } = err as unknown as ApiResponse;
      const message = getAuthErrorMessage(error);
      dispatch(
        setSnackbar({
          color: 'error',
          title: 'login error',
          content: message,
        })
      );
      return rejectWithValue(message);
    }
  }
);
export const signup = createAsyncThunk<User | undefined, LoginDataType>(
  'auth/signup',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.signup(payload.email, payload.password);
      return response.data;
    } catch (error) {
      dispatch(
        setSnackbar({
          color: 'error',
          title: 'login error',
          content: (error as ApiResponse).error.message,
        })
      );
      return rejectWithValue((error as ApiResponse).error.message);
    }
  }
);

export const getUserData = createAsyncThunk<User | undefined, void>(
  'auth/getUser',
  async (_payload, { rejectWithValue }) => {
    try {
      const response = await authService.getUserData();
      return response;
    } catch (error) {
      return rejectWithValue((error as ApiResponse).error.message);
    }
  }
);

export const logoutHandler = createAsyncThunk<void, void>(
  'auth/logout',
  async (_payload, { dispatch }) => {
    try {
      await authService.logout();
      dispatch(auth.actions.logout());
    } catch (error) {
      dispatch(
        setSnackbar({
          color: 'error',
          title: 'logout error',
          content: (error as ApiResponse).error.message,
        })
      );
    }
  }
);

export default auth.reducer;
export const { logout } = auth.actions;
