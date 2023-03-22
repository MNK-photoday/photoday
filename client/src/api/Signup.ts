import axios, { AxiosResponse, AxiosError } from 'axios';
import { LoginValue } from './Login';

const postSignup = async (loginForm: LoginValue) => {
  await axios.post<AxiosResponse>(`${import.meta.env.VITE_APP_API}/users`, {
    email: loginForm.email,
    password: loginForm.password,
  });
};

export default postSignup;
