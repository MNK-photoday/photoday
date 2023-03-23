import axios, { AxiosResponse } from 'axios';

export const getUser = async (userId: string | null) => {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get<AxiosResponse>(
    `${import.meta.env.VITE_APP_API}/users/${userId}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return response.data;
};

type newPassword = {
  inputValue: string;
  confirminputValue: string;
};

export const updatePasswordUser = async ({
  inputValue,
  confirminputValue,
}: newPassword) => {
  const token = localStorage.getItem('accessToken');
  await axios.post(
    `${import.meta.env.VITE_APP_API}/users/update/password`,
    {
      password: inputValue,
      checkPassword: confirminputValue,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );
};

export const deleteUser = async () => {
  const token = localStorage.getItem('accessToken');
  await axios.delete<AxiosResponse>(`${import.meta.env.VITE_APP_API}/users`, {
    headers: {
      Authorization: token,
    },
  });

  localStorage.removeItem('accessToken');
  localStorage.removeItem('userId');
};

export const updateUser = async (textareaValue: string) => {
  const userUpdateDto = new Blob(
    [JSON.stringify({ description: textareaValue })],
    { type: 'application/json' },
  );

  const formdata = new FormData();
  formdata.append('userUpdateDto', userUpdateDto);

  const token = localStorage.getItem('accessToken');
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/users/update`,
    formdata,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    },
  );

  return response.data;
};

export const getFollows = async () => {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get<AxiosResponse>(
    `${import.meta.env.VITE_APP_API}/follows`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return response.data;
};
