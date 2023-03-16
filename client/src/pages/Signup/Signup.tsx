import { useState, useEffect } from 'react';
import {
  S_LoginContainerWrap,
  S_ImgContainer,
  S_ContentSection,
  S_LoginContainer,
  S_PasswordGuide,
  S_CheckBoxContainer,
  S_ButtounContainer,
  S_LinkToTextContainer,
  S_InvalidMessage,
  S_LinkTo,
} from '../Login/Login.styles';
import {
  EmailInput,
  PasswordInput,
  CheckBox,
} from '../../components/Login/Input/Input';
import Button from '../../components/common/Button/Button';
import { S_TermsGuideModal, S_Ul, S_Li } from './Signup.styles';
import LoginLogo from '../../components/Login/LoginLogo/LoginLogo';
import GoogleButton from '../../components/Login/GoogleButton/GoogleButton';
import { S_InputContainerWrap } from '../../components/Login/Input/Input.styles';
import { LoginFormType, ValidationsType } from '../Login/Login';
import { validationLogin } from '../../components/Login/LoginValidationLogic/LoginValidationLogic';

function Signup() {
  const [isCheckedTerms, setIsCheckedTerms] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginFormType>({
    email: '',
    password: '',
  });
  const [validations, setValidations] = useState<ValidationsType>({
    isValidEmail: true,
    isValidPassword: true,
  });

  useEffect(() => {
    validationLogin({ loginForm, setValidations });
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

  const handleonChecked = () => {
    setIsCheckedTerms(!isCheckedTerms);
  };

  const handleonDoubleChecked = () => {
    setIsCheckedTerms(true);
  };

  const handleonIsShowModal = () => {
    setIsShowModal(!isShowModal);
    setIsCheckedTerms(false);
  };

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
          <S_PasswordGuide>
            Passwords must contain at least eight characters,
            <br /> including at least 1 letter and 1 number.
          </S_PasswordGuide>
          <S_CheckBoxContainer>
            <CheckBox isChecked={isCheckedTerms} onClickEvent={handleonChecked}>
              <p onClick={handleonIsShowModal}>Check Terms and Conditions</p>
            </CheckBox>
          </S_CheckBoxContainer>
          {isShowModal && (
            <S_TermsGuideModal>
              <p>
                본 이용약관에 동의함으로써 다음 내용을 모두 숙지, 동의한 것으로
                간주됩니다. 사용자는 이미지에 다른 보충 계약 조건이 적용될 수
                있음에 항상 주의해야 합니다.
              </p>
              <S_Ul>
                사용자
                <S_Li>
                  불법으로 간주되는 방식으로 이미지를 불법적으로 사용할 수
                  없습니다.
                </S_Li>
                <S_Li>
                  저작권이 있는 사진 이미지를 무단배포할 경우, 문제에 대한
                  책임은 게시물을 작성한 사용자에게 책임이 있습니다.
                </S_Li>
                <S_Li>
                  저작권이 있는 이미지를 업로드한 경우, 게시물을 작성한
                  작성자에게 책임이 있습니다.
                </S_Li>
                <S_Li>
                  pohtoday에 게시된 이미지를 디지털 콘텐츠 또는 디지털
                  배경화면으로 재배포, 판매하지 마십시오.
                </S_Li>
              </S_Ul>
              <CheckBox
                isChecked={isCheckedTerms}
                onClickEvent={() => {
                  handleonIsShowModal();
                  handleonDoubleChecked();
                }}
              >
                위와 같은 이용약관에 동의하십니까?
              </CheckBox>
            </S_TermsGuideModal>
          )}
          <S_ButtounContainer>
            <GoogleButton>Sign up with Google</GoogleButton>
            <Button
              variant="point"
              shape="default"
              size="XXLarge"
              fullWidth
              disabled={
                !validations.isValidEmail || !validations.isValidPassword
              }
            >
              Sign up
            </Button>
          </S_ButtounContainer>
          <S_LinkToTextContainer>
            Already have an account?
            <S_LinkTo to="/login" isAccount={false}>
              Log in
            </S_LinkTo>
          </S_LinkToTextContainer>
        </S_LoginContainer>
      </S_ContentSection>
    </S_LoginContainerWrap>
  );
}

export default Signup;
