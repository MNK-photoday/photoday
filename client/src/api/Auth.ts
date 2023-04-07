import axios, { AxiosResponse } from 'axios';

function checkAuth() {
  const accessToken = localStorage.getItem('accessToken');
  const keepLoggedIn = localStorage.getItem('keepLoggedIn');

  if (!accessToken || keepLoggedIn === 'false') {
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
      if (keepLoggedIn) {
        const response = await axios.get<AxiosResponse>(
          `${import.meta.env.VITE_APP_API}/auth/reissue`,
          {
            withCredentials: true,
            headers: {
              Authorization: accessToken,
            },
          },
        );

        localStorage.setItem('accessToken', response.headers.authorization);
      } else {
        localStorage.clear();
      }
    }
  };

  // setInterval(() => {
  verifyToken();
  // }, 3600 * 1000);

  return true;
}

export default checkAuth;
