import { useEffect } from 'react';
import { LoginFormType, ValidationsType } from '../../../pages/Login/Login';

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

interface ValidationLoginIProps {
  loginForm: LoginFormType;
  setValidations: React.Dispatch<React.SetStateAction<ValidationsType>>;
}

export function validationLogin({
  loginForm,
  setValidations,
}: ValidationLoginIProps) {
  const emailIdentifier = setTimeout(() => {
    if (loginForm.email) {
      setValidations((state) => {
        return {
          ...state,
          isValidEmail: validateEmail(loginForm.email),
        };
      });
    }
  }, 500);

  const passwordIdentifier = setTimeout(() => {
    if (loginForm.password) {
      setValidations((state) => {
        return {
          ...state,
          isValidPassword: validatePassword(loginForm.password),
        };
      });
    }
  }, 500);

  // 작성 후, 다 지웠을 때 변화를 위해서 추가
  if (!loginForm.email) {
    setValidations((state) => {
      return {
        ...state,
        isValidEmail: true,
      };
    });
  }

  if (!loginForm.password) {
    setValidations((state) => {
      return {
        ...state,
        isValidPassword: true,
      };
    });
  }

  return () => {
    clearTimeout(emailIdentifier);
    clearTimeout(passwordIdentifier);
  };
}

interface ValidationEmailIProps {
  emailValue: string;
  setValidEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export function validationEmail({
  emailValue,
  setValidEmail,
}: ValidationEmailIProps) {
  const emailIdentifier = setTimeout(() => {
    if (emailValue) {
      setValidEmail((state) => {
        return (state = validateEmail(emailValue));
      });
    }
  }, 500);

  // 작성 후, 다 지웠을 때 변화를 위해서 추가
  if (!emailValue) {
    setValidEmail((state) => {
      return (state = true);
    });

    return () => {
      clearTimeout(emailIdentifier);
    };
  }
}
