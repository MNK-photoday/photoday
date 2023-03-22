function checkAuth() {
  const tokenString = localStorage.getItem('accessToken');
  if (!tokenString) {
    return false;
  }

  const { token, expiresAt } = JSON.parse(tokenString);

  // 토큰이 만료된 경우
  if (new Date().getTime() > expiresAt) {
    localStorage.removeItem('accessToken');
    /*
    다시 발급받을 때 수정될 코드
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API}/api/auth/reissue`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      response.
    } catch (error) {
      console.error(error);
    }
    */
    return false;
  } else {
    return true;
  }
}

export default checkAuth;
