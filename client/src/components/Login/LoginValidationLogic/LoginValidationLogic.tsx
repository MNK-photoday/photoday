// 이메일 정규 표현식 => 일치 시 true 반환
export const validateEmail = (email: string) => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return regExp.test(email);
};

// 비밀번호 정규 표현식 => 일치 시 true 반환
//? 8 ~ 16자 영문, 숫자, 특수문자 최소 한가지씩 조합
export const validatePassword = (password: string) => {
  const regExp =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

  return regExp.test(password);
};
