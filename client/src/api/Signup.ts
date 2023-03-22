import axios, { AxiosResponse, AxiosError } from 'axios';
import { LoginValue } from './Login';
import { ErrorResponse } from './Login';

const postSignup = async (loginForm: LoginValue) => {
  try {
    await axios.post<undefined, AxiosResponse<ErrorResponse>>(
      `${import.meta.env.VITE_APP_API}/api/users`,
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
        const errorResponse: ErrorResponse = error.response.data.message;
        if (errorResponse) {
          alert(errorResponse);
        } else {
          const newErrorResponse: ErrorResponse =
            error.response.data.fieldErrors[0].message;
          alert(newErrorResponse);
        }
      }
    }
  }
};

export default postSignup;
