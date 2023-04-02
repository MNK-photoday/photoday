import axios, { AxiosResponse } from 'axios';

function checkAuth() {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return false;
  }

  const verifyToken = async () => {
    try {
      await axios.get<AxiosResponse>(
        `${import.meta.env.VITE_APP_API}/auth/accessToken`,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
    } catch (e) {
      const response = await axios.get<AxiosResponse>(
        `${import.meta.env.VITE_APP_API}/auth/reissue`,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );

      localStorage.clear();
      location.reload();
      return false;
    }
  };
  verifyToken();

  return true;
}

export default checkAuth;
