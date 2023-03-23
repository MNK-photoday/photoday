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

  const formData = new FormData();
  formData.append('userUpdateDto', userUpdateDto);

  const token = localStorage.getItem('accessToken');
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/users/update`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    },
  );

  return response.data;
};

export const updateFile = async (file: File) => {
  console.log('이제 막 서버로 보내려고 받은 파일 =>', file);
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('accessToken');
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/users/update`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    },
  );
  console.log('서버 응답 =>', response.data.data.profileImageUrl);
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

export const patchFollow = async (followingId: number | null) => {
  const token = localStorage.getItem('accessToken');
  const response = await axios.patch<AxiosResponse>(
    `${import.meta.env.VITE_APP_API}/follows/${followingId}`,
    null,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return response.data;
};

export const getUserImages = async (userId: string | null | undefined) => {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get<AxiosResponse>(
    `${import.meta.env.VITE_APP_API}/images/user/${userId}`,
    {
      headers: {
        Authorization: token,
      },
      params: {
        size: 5, // 페이지당 이미지 개수
        page: 1, // 페이지 번호
        sort: 'imageId,desc', // 정렬 방식 (imageId 기준으로 내림차순)
      },
    },
  );
};
