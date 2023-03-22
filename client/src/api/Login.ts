import axios, { AxiosResponse, AxiosError } from 'axios';
import { LoginValue } from '../pages/Login/Login';

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
  try {
    const response = await axios.post<undefined, AxiosResponse<ErrorResponse>>(
      `${import.meta.env.VITE_APP_API_URL}/api/auth/login`,
      {
        email: loginForm.email,
        password: loginForm.password,
      },
    );
    const accessToken: string | undefined =
      response.headers.authorization.replace(/^Bearer /, '');

    if (keepLoggedIn) {
      if (accessToken) {
        const expirationTime = new Date().getTime() + 5 * 60 * 60 * 1000;
        localStorage.setItem(
          'accessToken',
          JSON.stringify({
            token: accessToken,
            expiresAt: expirationTime,
          }),
        );
      }
    }
    window.history.back();
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const errorResponse: ErrorResponse = error.response.data.message;
        alert(errorResponse);
      }
    }
  }
};
