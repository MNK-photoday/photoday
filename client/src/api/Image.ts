import axios, { AxiosResponse } from 'axios';

export const patchLikeImage = async (imageId: number) => {
  const jwtToken = localStorage.getItem('accessToken');
  const response: AxiosResponse = await axios.patch(
    `${import.meta.env.VITE_APP_API}/images/${imageId}/likes`,
    {},
    {
      headers: {
        Authorization: `${jwtToken}`,
      },
    },
  );
  return response.data;
};

export const patchBookmarkImage = async (imageId: number) => {
  const jwtToken = localStorage.getItem('accessToken');

  const response: AxiosResponse = await axios.patch(
    `${import.meta.env.VITE_APP_API}/images/${imageId}/bookmarks`,
    {},
    {
      headers: {
        Authorization: `${jwtToken}`,
      },
    },
  );
  return response.data;
};

export const getDetailImage = async (imageId: number) => {
  const jwtToken = localStorage.getItem('accessToken');

  const response: AxiosResponse = await axios.get(
    `${import.meta.env.VITE_APP_API}/images/${imageId}`,
    {
      headers: {
        Authorization: `${jwtToken}`,
      },
    },
  );
  return response.data;
};

export const getMainImage = async () => {
  const response: AxiosResponse = await axios.get(
    `${import.meta.env.VITE_APP_API}/images/main`,
  );
  return response.data;
};
