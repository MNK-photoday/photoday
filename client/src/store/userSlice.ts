import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserData = {
  checkAdmin: boolean;
  checkFollow: boolean;
  description: string;
  followerCount: number;
  followingCount: number;
  likeCount: number;
  myPage: boolean;
  name: string;
  profileImageUrl: string;
  reportCount: number;
  userId: number | null;
};

type SetDataPayload = {
  data: UserData;
};

const userId = localStorage.getItem('id');
const initialState: UserData = {
  checkAdmin: false,
  checkFollow: false,
  description: '',
  followerCount: 0,
  followingCount: 0,
  likeCount: 0,
  myPage: userId ? true : false,
  name: '',
  profileImageUrl: '',
  reportCount: 0,
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<SetDataPayload>) => {
      return { ...state, ...action.payload.data };
    },
    setFollow: (state) => {
      return { ...state, checkFollow: !state.checkFollow };
    },
    setFollower: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        followerCount: Number(state.followerCount) + action.payload,
      };
    },
    setfollowing: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        followingCount: Number(state.followingCount) + action.payload,
      };
    },
  },
});

export const { setData, setFollow, setFollower, setfollowing } =
  userSlice.actions;
export default userSlice.reducer;
