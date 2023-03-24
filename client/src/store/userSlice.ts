import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserData = {
  userId: number | null;
  name: string;
  profileImageUrl: string;
  description: string;
  likeCount: number | null;
  reportCount: number | null;
  followerCount: number | null;
  followingCount: number | null;
  checkFollow: boolean;
};

type SetDataPayload = {
  data: UserData;
};

const initialState: UserData = {
  userId: null,
  name: '',
  profileImageUrl: '',
  description: '',
  likeCount: null,
  reportCount: null,
  followerCount: null,
  followingCount: null,
  checkFollow: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<SetDataPayload>) => {
      return { ...state, ...action.payload.data };
    },
  },
});

export const { setData } = userSlice.actions;
export default userSlice.reducer;
