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
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { login, logout, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
