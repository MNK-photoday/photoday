import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import {
  S_LinkTo,
  S_LinkToWrap,
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
import { postLogin, LoginValue } from '../../api/Login';
import { login } from '../../store/authSlice';

export type ValidityResults = {
  isValidEmail: boolean;
  isValidPassword: boolean;
};

function Login() {
  const dispatch = useDispatch();
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
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

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await postLogin(loginForm, keepLoggedIn);
      const { userId, userProfileImage } = response;
      dispatch(login({ userId, userProfileImage }));
      window.location.href = '/';
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    }
  };

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

  const clickkeepLoggedInHandler = () => {
    setKeepLoggedIn(!keepLoggedIn);
  };

  return (
    <S_LoginContainerWrap>
      <S_ImgContainer />
      <S_ContentSection>
        <S_LoginContainer onSubmit={loginHandler}>
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
                Passwords must contain 8 to 20 characters in English, numbers,
                and special characters.
              </S_InvalidMessage>
            )}
          </S_InputContainerWrap>
          <S_LinkToWrap>
            <S_LinkTo to="/account-recovery" isaccount="true">
              Forgot password?
            </S_LinkTo>
          </S_LinkToWrap>
          <S_CheckBoxContainer>
            <CheckBox
              isChecked={keepLoggedIn}
              onClickEvent={clickkeepLoggedInHandler}
            >
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
            <S_LinkTo to="/signup" isaccount="false">
              Sign Up
            </S_LinkTo>
          </S_LinkToTextContainer>
        </S_LoginContainer>
      </S_ContentSection>
    </S_LoginContainerWrap>
  );
}

export default Login;
