import axios, { AxiosResponse, AxiosError } from 'axios';
import { LoginValue } from '../pages/Login/Login';

type FieldError = {
  field: string;
  rejectedValue: string;
  message: string;
};

type ErrorResponse = {
  fieldErrors: FieldError[] | null;
  violationErrors: any[] | null;
  httpStatus: number | null;
  message: string | null;
};

const postSignup = async (loginForm: LoginValue) => {
  try {
    await axios.post<undefined, AxiosResponse<ErrorResponse>>(
      'http://3.39.238.242:8080/api/users',
      {
        email: loginForm.email,
        password: loginForm.password,
      },
    );
    alert('가입을 환영합니다!');
    window.history.back();
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const errorResponse: ErrorResponse = error.response.data;
        alert(errorResponse.message);
      }
    }
  }
};

export default postSignup;
