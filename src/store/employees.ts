import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import employeesService from 'services/Users';
import { Employee, ListItem, PostEmployeePayload, User } from 'types';
import { setSnackbar } from './snackbar';

const initialState: ListItem<User> & { loading: boolean } = {
  data: [],
  totalCount: 0,
  loading: false,
};
const users = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<ListItem<User>>) => {
      state.loading = false;
      state.data = action.payload.data ?? [];
      state.totalCount = action.payload.totalCount ?? 0;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const getUsers = createAsyncThunk<ListItem<User>, void>(
  'users/get',
  async (_payload, { dispatch, rejectWithValue }) => {
    try {
      const result = await employeesService.getUsers();
      return result;
    } catch (error) {
      dispatch(setSnackbar({ title: 'something went wrong', color: 'error' }));
      return rejectWithValue(error);
    }
  }
);

export const addEmployee = createAsyncThunk<void, User>(
  'users/add',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      await employeesService.addEmployee(payload);
      dispatch(getUsers());
      dispatch(setSnackbar({ title: 'Employee added successfully', color: 'success' }));
    } catch (error) {
      dispatch(setSnackbar({ title: 'something went wrong', color: 'error' }));
      return rejectWithValue(error);
    }
  }
);
export const editEmployee = createAsyncThunk<void, Employee>(
  'users/edit',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      await employeesService.updateEmployee(payload);
      dispatch(getUsers());
      dispatch(setSnackbar({ title: 'Employee updated successfully', color: 'success' }));
    } catch (error) {
      dispatch(setSnackbar({ title: 'something went wrong', color: 'error' }));
      return rejectWithValue(error);
    }
  }
);

export const deleteEmployee = createAsyncThunk<void, string>(
  'users/delete',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      await employeesService.deleteEmployee(payload);
      dispatch(getUsers());
      dispatch(setSnackbar({ title: 'Employee deleted successfully', color: 'success' }));
    } catch (error: any) {
      dispatch(
        setSnackbar({
          title: 'something went wrong',
          content: error.error as string,
          color: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export default users.reducer;
