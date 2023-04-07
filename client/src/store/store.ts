import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import { setLoggedIn } from './authSlice';
import checkAuth from '../api/Auth';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

setInterval(() => {
  const isLoggedIn = checkAuth();
  store.dispatch(setLoggedIn(isLoggedIn));
}, 3600 * 1000);

export default store;

/*
다음과 같이 auth state 값을 확인할 수 있습니다.
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

! state 상태를 ts로 정의해 주어야 함으로 아래와 같이 RootState 타입을 import 해 지정합니다.
const auth = useSelector((state: RootState) => state.auth);
*/
