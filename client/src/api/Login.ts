import axios, { AxiosResponse, AxiosError } from 'axios';

export type LoginValue = {
  email: string;
  password: string;
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
  const response = await axios.post<undefined, AxiosResponse<ErrorResponse>>(
    `${import.meta.env.VITE_APP_API}/api/auth/login`,
    {
      email: loginForm.email,
      password: loginForm.password,
    },
  );

  const accessToken: string | undefined = response.headers.authorization;

  if (keepLoggedIn && accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }
};
