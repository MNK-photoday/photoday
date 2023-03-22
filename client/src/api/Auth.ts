function checkAuth() {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return false;
  }

  /*
    다시 발급받을 때 수정될 코드
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API}/api/auth/reissue`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.error(error);
    }
  */

  return true;
}

export default checkAuth;
