import { ValidityResults } from '../LoginSection/LoginSection';
import { LoginValue } from '../../../api/Login';

export const validateEmail = (email: string) => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return regExp.test(email);
};

//? 8 ~ 20자 영문, 숫자, 특수문자 최소 한가지씩 조합
export const validatePassword = (password: string) => {
  const regExp =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

  return regExp.test(password);
};

interface ValidateLoginType {
  loginForm: LoginValue;
  setValidations: React.Dispatch<React.SetStateAction<ValidityResults>>;
}

export function validateLogin({
  loginForm,
  setValidations,
}: ValidateLoginType) {
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

interface ValidateType {
  inputValue: string;
  setValidValue: React.Dispatch<React.SetStateAction<boolean>>;
  VALUE_TYPE: string;
}

export function validateValue({
  inputValue,
  setValidValue,
  VALUE_TYPE,
}: ValidateType) {
  const valueIdentifier = setTimeout(() => {
    if (inputValue) {
      switch (VALUE_TYPE) {
        case 'email':
          setValidValue((state) => {
            return (state = validateEmail(inputValue));
          });
          break;
        case 'password':
          setValidValue((state) => {
            return (state = validatePassword(inputValue));
          });
          break;
      }
    }
  }, 500);

  if (!inputValue) {
    setValidValue((state) => {
      return (state = true);
    });

    return () => {
      clearTimeout(valueIdentifier);
    };
  }
}
