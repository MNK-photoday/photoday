import axios, { AxiosResponse } from 'axios';

const postPassword = async (inputValue: string) => {
  await axios.post<AxiosResponse>(
    `${import.meta.env.VITE_APP_API}/api/auth/password`,
    null,
    { params: { email: inputValue } },
  );
};

export default postPassword;
