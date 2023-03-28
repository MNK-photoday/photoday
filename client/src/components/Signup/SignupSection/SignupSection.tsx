import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { validateLogin } from '../../Login/LoginValidationLogic/LoginValidationLogic';
import { LoginValue, ErrorResponse } from '../../../api/Login';
import {
  S_FormContainer,
  S_InvalidMessage,
  S_CheckBoxContainer,
  S_ButtounContainer,
  S_LinkToTextContainer,
  S_LinkTo,
} from '../../Login/LoginSection/LoginSection.styles';
import { S_InputContainer } from '../../Login/Input/Input.styles';
import { S_PasswordGuide } from './SignupSection.styles';
import { ValidityResults } from '../../Login/LoginSection/LoginSection';
import { EmailInput, PasswordInput, CheckBox } from '../../Login/Input/Input';
import postSignup from '../../../api/Signup';
import Button from '../../common/Button/Button';
import LoginLogo from '../../Login/LoginLogo/LoginLogo';
import GoogleButton from '../../Login/GoogleButton/GoogleButton';
import TermsGuideModal from '../TermsGuideModal/TermsGuideModal';

function SignupSection() {
  const [isCheckedTerms, setIsCheckedTerms] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
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

  const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCheckedTerms) {
      try {
        await postSignup(loginForm);
        alert('photoday 회원가입이 성공적으로 완료되었습니다.');
        window.history.back();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            const errorData = error.response.data;
            const errorResponse: ErrorResponse = errorData.message;
            if (errorResponse) {
              alert(errorResponse);
            } else {
              alert(errorData.fieldErrors[0].message);
            }
          }
        }
      }
    } else {
      alert('약관을 확인해 주세요.');
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

  const onCheckedHandler = () => {
    setIsCheckedTerms(!isCheckedTerms);
  };

  const doubleCheckHandler = () => {
    setIsCheckedTerms(true);
  };

  const modalHandler = () => {
    setIsShowModal(!isShowModal);
    setIsCheckedTerms(false);
  };
  return (
    <S_FormContainer onSubmit={signupHandler}>
      <LoginLogo />
      <S_InputContainer>
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
            Passwords must contain 8 to 20 characters in English, numbers, and
            special characters.
          </S_InvalidMessage>
        )}
      </S_InputContainer>
      <S_PasswordGuide>
        Passwords must contain at least eight characters,
        <br /> including at least 1 letter and 1 number.
      </S_PasswordGuide>
      <S_CheckBoxContainer>
        <CheckBox
          isChecked={isCheckedTerms}
          onClickEventHandler={onCheckedHandler}
        >
          <p onClick={modalHandler}>Check Terms and Conditions</p>
        </CheckBox>
      </S_CheckBoxContainer>
      {isShowModal && (
        <TermsGuideModal
          isCheckedTerms={isCheckedTerms}
          modalHandler={modalHandler}
          doubleCheckHandler={doubleCheckHandler}
        />
      )}
      <S_ButtounContainer>
        <GoogleButton>Sign up with Google</GoogleButton>
        <Button
          variant="point"
          shape="default"
          size="XXLarge"
          fullWidth
          disabled={!validations.isValidEmail || !validations.isValidPassword}
        >
          Sign up
        </Button>
      </S_ButtounContainer>
      <S_LinkToTextContainer>
        Already have an account?
        <S_LinkTo to="/login" isaccount="false">
          Log in
        </S_LinkTo>
      </S_LinkToTextContainer>
    </S_FormContainer>
  );
}

export default SignupSection;
