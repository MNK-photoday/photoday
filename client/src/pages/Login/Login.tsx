import { useEffect, useState } from 'react';
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
import Button from '../../components/common/Button/Button';
import LoginLogo from '../../components/Login/LoginLogo/LoginLogo';
import GoogleButton from '../../components/Login/GoogleButton/GoogleButton';
import { S_InputContainerWrap } from '../../components/Login/Input/Input.styles';
import { validateLogin } from '../../components/Login/LoginValidationLogic/LoginValidationLogic';

export interface LoginValue {
  email: string;
  password: string;
}

export interface ValidityResults {
  isValidEmail: boolean;
  isValidPassword: boolean;
}

function Login() {
  const [isSigned, setIsSigned] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginValue>({
    email: '',
    password: '',
  });
  const [validations, setValidations] = useState<ValidityResults>({
    isValidEmail: true,
    isValidPassword: true,
  });

  useEffect(() => {
    validateLogin({ loginForm, setValidations });
  }, [loginForm]);

  const changeEmailAndPasswordValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
            {!validations.isValidEmail && (
              <S_InvalidMessage
                isShowMessage={!validations.isValidEmail ? 'show' : 'hide'}
              >
                {`${loginForm.email} is not a valid email address.`}
              </S_InvalidMessage>
            )}
            <PasswordInput
              labelValue="password"
              passwordValue={loginForm.password}
              changeEventHandler={changeEmailAndPasswordValueHandler}
            />
            {!validations.isValidPassword && (
              <S_InvalidMessage
                isShowMessage={!validations.isValidPassword ? 'show' : 'hide'}
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
              size="XXLarge"
              fullWidth
              disabled={
                !validations.isValidEmail || !validations.isValidPassword
              }
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
