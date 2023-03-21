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
      `${import.meta.env.VITE_APP_API_URL}/api/users`,
      {
        email: loginForm.email,
        password: loginForm.password,
      },
    );
    alert('potoday 회원가입이 성공적으로 완료되었습니다.');
    window.history.back();
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        console.log(error.response);
        const errorResponse: ErrorResponse = error.response.data;
        alert(errorResponse.message);
      }
    }
  }
};

export default postSignup;
