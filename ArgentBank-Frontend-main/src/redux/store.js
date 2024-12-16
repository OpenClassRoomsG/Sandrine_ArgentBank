import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/auth';
import userSlice from './slice/user';

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});
