import axios, { AxiosResponse } from 'axios';

// 비회원일 때 확인하기
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
  await axios.patch(
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

export const deleteUser = async (userId: string | null) => {
  const token = localStorage.getItem('accessToken');
  await axios.delete<AxiosResponse>(
    `${import.meta.env.VITE_APP_API}/users/${userId}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  localStorage.removeItem('accessToken');
  localStorage.removeItem('id');
};

export const updateUser = async (textareaValue: string) => {
  const token = localStorage.getItem('accessToken');
  const userUpdateDto = new Blob(
    [JSON.stringify({ description: textareaValue })],
    { type: 'application/json' },
  );

  const formData = new FormData();
  formData.append('userUpdateDto', userUpdateDto);

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
  const token = localStorage.getItem('accessToken');
  const formData = new FormData();
  formData.append('file', file);

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

export const getFollows = async (userId: string | null | undefined) => {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get<AxiosResponse>(
    `${import.meta.env.VITE_APP_API}/follows/${userId}`,
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

export type Image = {
  imageId: number;
  imageUrl: string;
  like: boolean;
  bookmark: boolean;
};

export type PageInfo = {
  pageNumber: number;
  size: number;
  totalPages: number;
  totalElements: number;
};

type ImageListResponse = {
  data: Image[];
  pageInfo: PageInfo;
};

export const getUserPosts = async (
  userId: string | null | undefined,
  paginate: number,
  currentTap: string,
) => {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get<ImageListResponse>(
    currentTap === 'user'
      ? `${import.meta.env.VITE_APP_API}/images/user/${userId}`
      : `${import.meta.env.VITE_APP_API}/images/bookmarks`,
    {
      headers: {
        Authorization: token,
      },
      params: {
        size: 6,
        page: paginate,
        sort: 'imageId,desc',
      },
    },
  );

  return response.data;
};

export const deleteProfile = async () => {
  const token = localStorage.getItem('accessToken');
  const response = await axios.delete<AxiosResponse>(
    `${import.meta.env.VITE_APP_API}/users/delete/profile-image`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return response.data;
};
