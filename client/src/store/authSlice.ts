import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import checkAuth from '../api/Auth';

type AuthState = {
  isLoggedIn: boolean;
  id: string | null;
};

const userId = localStorage.getItem('id');
const initialState: AuthState = {
  isLoggedIn: checkAuth(),
  id: userId ? userId : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.id = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.id = null;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { login, logout, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
