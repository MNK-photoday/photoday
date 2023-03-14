import {
  S_LinkTo,
  S_ImgContainer,
  S_ContentSection,
  S_LoginContainer,
  S_InvalidMessage,
  S_ButtounContainer,
  S_CheckBoxContainer,
  S_LoginContainerWrap,
  S_LinkToTextContainer,
} from './Login.styles';
import {
  EmailInput,
  PasswordInput,
  CheckBox,
} from '../../components/Login/Input/Input';
import {
  validateEmail,
  validatePassword,
} from '../../components/Login/LoginValidationLogic/LoginValidationLogic';
import { useEffect, useState } from 'react';
import Button from '../../components/common/Button/Button';
import LoginLogo from '../../components/Login/LoginLogo/LoginLogo';
import GoogleButton from '../../components/Login/GoogleButton/GoogleButton';
import { S_InputContainerWrap } from '../../components/Login/Input/Input.styles';

function Login() {
  const [isSigned, setIsSigned] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [isAllValid, setIsAllValid] = useState({
    email: true,
    password: true,
  });

  useEffect(() => {
    const emailIdentifier = setTimeout(() => {
      if (loginForm.email) {
        setIsAllValid((state) => {
          return {
            ...state,
            email: validateEmail(loginForm.email),
          };
        });
      }
    }, 500);

    const passwordIdentifier = setTimeout(() => {
      if (loginForm.password) {
        setIsAllValid((state) => {
          return {
            ...state,
            password: validatePassword(loginForm.password),
          };
        });
      }
    }, 500);

    // 작성 후, 다 지웠을 때 변화를 위해서 추가
    if (!loginForm.email) {
      setIsAllValid((state) => {
        return {
          ...state,
          email: true,
        };
      });
    }
    if (!loginForm.password) {
      setIsAllValid((state) => {
        return {
          ...state,
          password: true,
        };
      });
    }

    return () => {
      clearTimeout(emailIdentifier);
      clearTimeout(passwordIdentifier);
    };
  }, [loginForm]);

  const changeEmailAndPasswordValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const inputType = e.target.type;
    const value = e.target.value;

    switch (inputType) {
      case 'email':
        setLoginForm({ ...loginForm, email: value });
        break;
      case 'password':
        setLoginForm({ ...loginForm, password: value });
        break;
    }
  };

  const clickSignedHandler = () => {
    setIsSigned(!isSigned);
  };

  /* 
  ! 기능 구현할 때 참고할 주석입니다.
  ? Login 버튼 눌렀을 때
    1. email value가 ''이 아니고, password value가 ''이 아닐 것
    2. isAllValid.email과 isAllValid.password가 true일 것
  */

  return (
    <S_LoginContainerWrap>
      <S_ImgContainer />
      <S_ContentSection>
        <S_LoginContainer>
          <LoginLogo />
          <S_InputContainerWrap>
            <EmailInput
              emailValue={loginForm.email}
              changeEventHandler={changeEmailAndPasswordValueHandler}
            />
            {!isAllValid.email && (
              <S_InvalidMessage
                isShowMessage={!isAllValid.email ? 'show' : 'hide'}
              >
                {`${loginForm.email} is not a valid email address.`}
              </S_InvalidMessage>
            )}
            <PasswordInput
              passwordValue={loginForm.password}
              changeEventHandler={changeEmailAndPasswordValueHandler}
            />
            {!isAllValid.password && (
              <S_InvalidMessage
                isShowMessage={!isAllValid.password ? 'show' : 'hide'}
              >
                Passwords must contain 8 to 16 characters in English, numbers,
                and special characters.
              </S_InvalidMessage>
            )}
          </S_InputContainerWrap>
          <S_LinkTo to="/account-recovery" isAccount>
            Forgot password?
          </S_LinkTo>
          <S_CheckBoxContainer>
            <CheckBox isChecked={isSigned} onClickEvent={clickSignedHandler}>
              Stay signed in
            </CheckBox>
          </S_CheckBoxContainer>
          <S_ButtounContainer>
            <GoogleButton>Log in with Google</GoogleButton>
            <Button
              variant="point"
              shape="default"
              size="large"
              fullWidth
              disabled={!isAllValid.email || !isAllValid.password}
            >
              Log in
            </Button>
          </S_ButtounContainer>
          <S_LinkToTextContainer>
            Don’t have an account?
            <S_LinkTo to="/signup" isAccount={false}>
              Sign Up
            </S_LinkTo>
          </S_LinkToTextContainer>
        </S_LoginContainer>
      </S_ContentSection>
    </S_LoginContainerWrap>
  );
}

export default Login;
