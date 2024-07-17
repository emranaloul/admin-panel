import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import employeesService from 'services/Employees';
import { Employee, PostEmployeePayload } from 'types';
import { setSnackbar } from './snackbar';

const initialState: { employees: Employee[]; loading: boolean } = {
  employees: [],
  loading: false,
};
const employees = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload ?? [];
    });
    builder.addCase(getEmployees.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const getEmployees = createAsyncThunk<Employee[] | undefined, void>(
  'employees/get',
  async (_payload, { dispatch, rejectWithValue }) => {
    try {
      const result = await employeesService.getEmployees();
      return result;
    } catch (error) {
      dispatch(setSnackbar({ title: 'something went wrong', color: 'error' }));
      return rejectWithValue(error);
    }
  }
);

export const addEmployee = createAsyncThunk<void, PostEmployeePayload>(
  'employees/add',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      await employeesService.addEmployee(payload);
      dispatch(getEmployees());
      dispatch(setSnackbar({ title: 'Employee added successfully', color: 'success' }));
    } catch (error) {
      dispatch(setSnackbar({ title: 'something went wrong', color: 'error' }));
      return rejectWithValue(error);
    }
  }
);
export const editEmployee = createAsyncThunk<void, Employee>(
  'employees/edit',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      await employeesService.updateEmployee(payload);
      dispatch(getEmployees());
      dispatch(setSnackbar({ title: 'Employee updated successfully', color: 'success' }));
    } catch (error) {
      dispatch(setSnackbar({ title: 'something went wrong', color: 'error' }));
      return rejectWithValue(error);
    }
  }
);

export const deleteEmployee = createAsyncThunk<void, string>(
  'employees/delete',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      await employeesService.deleteEmployee(payload);
      dispatch(getEmployees());
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

export default employees.reducer;
