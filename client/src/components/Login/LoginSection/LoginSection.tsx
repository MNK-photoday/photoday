import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { S_InputContainer } from '../Input/Input.styles';
import { EmailInput, PasswordInput, CheckBox } from '../Input/Input';
import {
  S_FormContainer,
  S_InvalidMessage,
  S_LinkToWrap,
  S_LinkTo,
  S_CheckBoxContainer,
  S_ButtounContainer,
  S_LinkToTextContainer,
} from './LoginSection.styles';
import LoginLogo from '../LoginLogo/LoginLogo';
import Button from '../../common/Button/Button';
import GoogleButton from '../GoogleButton/GoogleButton';
import { login } from '../../../store/authSlice';
import { postLogin, LoginValue } from '../../../api/Login';
import { validateLogin } from '../LoginValidationLogic/LoginValidationLogic';

export type ValidityResults = {
  isValidEmail: boolean;
  isValidPassword: boolean;
};

function LoginSection() {
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
          console.log('왜 안 돼', error);
          alert(error.response.data.message);
        }
      }
    }
  };

  const changeInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const clickKeepLoggedInHandler = () => {
    setKeepLoggedIn(!keepLoggedIn);
  };

  return (
    <S_FormContainer onSubmit={loginHandler}>
      <LoginLogo />
      <S_InputContainer>
        <EmailInput
          emailValue={loginForm.email}
          changeEventHandler={changeInputValueHandler}
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
          changeEventHandler={changeInputValueHandler}
        />
        {!validations.isValidPassword && (
          <S_InvalidMessage
            isShowMessage={!validations.isValidPassword ? 'show' : 'hide'}
          >
            Passwords must contain 8 to 20 characters in English, numbers, and
            special characters.
          </S_InvalidMessage>
        )}
      </S_InputContainer>
      <S_LinkToWrap>
        <S_LinkTo to="/account-recovery" isaccount="true">
          Forgot password?
        </S_LinkTo>
      </S_LinkToWrap>
      <S_CheckBoxContainer>
        <CheckBox
          isChecked={keepLoggedIn}
          onClickEventHandler={clickKeepLoggedInHandler}
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
          disabled={!validations.isValidEmail || !validations.isValidPassword}
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
    </S_FormContainer>
  );
}

export default LoginSection;
