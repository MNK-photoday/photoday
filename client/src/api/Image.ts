import axios, { AxiosError, AxiosResponse } from 'axios';

export const patchLikeImage = async (imageId: number) => {
  const jwtToken = localStorage.getItem('accessToken');
  try {
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
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        alert('로그인 후 이용 가능합니다. ');
      }
      console.log(error.response);
    }
  }
};

export const patchBookmarkImage = async (imageId: number) => {
  const jwtToken = localStorage.getItem('accessToken');
  try {
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
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    }
  }
};

export const getDetailImage = async (imageId: number) => {
  const jwtToken = localStorage.getItem('accessToken');
  try {
    const response: AxiosResponse = await axios.get(
      `${import.meta.env.VITE_APP_API}/images/${imageId}`,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        alert('로그인 후 이용 가능합니다. ');
      }
      console.log(error.response);
    }
  }
};

export const getMainImage = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${import.meta.env.VITE_APP_API}/images/main`,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
    }
  }
};
