import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import checkAuth from '../api/Auth';

type AuthState = {
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  isLoggedIn: checkAuth(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
