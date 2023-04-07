import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import checkAuth from '../api/Auth';

type AuthState = {
  isLoggedIn: boolean | undefined;
  id: string | null;
  userProfileImage: string;
  setUserProfile: string;
};

const userId = localStorage.getItem('id');
const userProfileImage = localStorage.getItem('userProfileImage');
const initialState: AuthState = {
  isLoggedIn: checkAuth(),
  id: userId ? userId : null,
  userProfileImage: userProfileImage ? userProfileImage : '',
  setUserProfile: userProfileImage ? userProfileImage : '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        userId: string | null;
        userProfileImage: any;
      }>,
    ) => {
      return {
        ...state,
        isLoggedIn: true,
        id: action.payload.userId,
        userProfileImage: action.payload.userProfileImage,
      };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.id = null;
      state.userProfileImage = '';
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfileImage = action.payload;
    },
  },
});

export const { login, logout, setLoggedIn, setUserProfile } = authSlice.actions;
export default authSlice.reducer;
