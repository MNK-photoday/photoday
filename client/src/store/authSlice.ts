import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import checkAuth from '../api/Auth';

type AuthState = {
  isLoggedIn: boolean;
  userId: string | null;
};

const id = localStorage.getItem('userId');
const initialState: AuthState = {
  isLoggedIn: checkAuth(),
  userId: id ? id : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.userId = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { login, logout, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
