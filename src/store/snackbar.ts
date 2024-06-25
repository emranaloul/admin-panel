import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { ColorType } from 'types';

const initialState: {
  title: string;
  content?: string;
  color?: ColorType;
  open: boolean;
  icon?: ReactNode;
} = {
  title: '',
  content: undefined,
  color: 'info',
  open: false,
};

const snackbar = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar: (state, action: PayloadAction<Partial<typeof initialState>>) => {
      state.title = action.payload.title ?? '';
      state.content = action.payload.content;
      state.color = action.payload.color;
      state.icon = action.payload.icon;
      state.open = true;
    },
    clearSnackbar: () => {
      return initialState;
    },
  },
});

export default snackbar.reducer;

export const { setSnackbar, clearSnackbar } = snackbar.actions;
