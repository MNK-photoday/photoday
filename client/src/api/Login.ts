import axios, { AxiosResponse } from 'axios';

export type LoginValue = {
  email: string;
  password: string;
};

export type User = {
  userId: number;
  userProfileImage: string;
  userName: string;
};

export type FieldError = {
  field: string;
  rejectedValue: string;
  message: string;
};

export type ErrorResponse = {
  fieldErrors: FieldError[] | null;
  violationErrors: any[] | null;
  httpStatus: number | null;
  message: string | null;
  authorization?: string;
};

export const postLogin = async (
  loginForm: LoginValue,
  keepLoggedIn: boolean,
) => {
  const response = await axios.post<undefined, AxiosResponse>(
    `${import.meta.env.VITE_APP_API}/auth/login`,
    {
      email: loginForm.email,
      password: loginForm.password,
    },
  );

  const accessToken = response.headers.authorization;
  const userId = response.data.userId;

  if (keepLoggedIn && accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('id', userId);
  }
  return userId;
};
