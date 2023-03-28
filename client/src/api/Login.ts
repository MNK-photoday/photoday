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

  const { userId, userProfileImage } = response.data;
  const accessToken = response.headers.authorization;

  if (keepLoggedIn && accessToken) {
    localStorage.setItem('id', userId);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userProfileImage', userProfileImage);
  }

  return { userId, userProfileImage };
};

export const socialLogin = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId: any = urlParams.get('userId');
  const userProfileImage: any = urlParams.get('userProfileImage');
  const authorization: any = `Bearer ${urlParams.get('accessToken')}`;

  localStorage.setItem('id', userId);
  localStorage.setItem('accessToken', authorization);
  localStorage.setItem('userProfileImage', userProfileImage);

  return { userId, userProfileImage };
};
