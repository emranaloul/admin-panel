import { configureStore } from '@reduxjs/toolkit';
import snackbar from './snackbar';
import auth from './auth';
import users from './employees';

export const store = configureStore({
  reducer: {
    snackbar,
    auth,
    users,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
