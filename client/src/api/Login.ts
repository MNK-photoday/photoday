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
};

const postLogin = async (loginForm: LoginValue) => {
  try {
    await axios.post<undefined, AxiosResponse<ErrorResponse>>(
      `${import.meta.env.VITE_APP_API_URL}/api/auth/login`,
      {
        email: loginForm.email,
        password: loginForm.password,
      },
    );
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

export default postLogin;
