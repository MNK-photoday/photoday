import {
  S_LoginContainerWrap,
  S_ImgContainer,
  S_ContentSection,
  S_LoginContainer,
  S_LinkTo,
  S_CheckBoxContainer,
  S_ButtounContainer,
  S_LinkToTextContainer,
} from './Login.styles';
import { Input, CheckBox } from '../../components/Login/Input/Input';
import GoogleButton from '../../components/Login/GoogleButton/GoogleButton';
import Button from '../../components/common/Button/Button';
import LoginLogo from '../../components/Login/LoginLogo/LoginLogo';
import { useState } from 'react';

function Login() {
  const [isSigned, setIsSigned] = useState(false);

  const handleIsSigned = () => {
    setIsSigned(!isSigned);
  };

  return (
    <S_LoginContainerWrap>
      <S_ImgContainer />
      <S_ContentSection>
        <S_LoginContainer>
          <LoginLogo />
          <Input />
          <S_LinkTo to="/account-recovery" isAccount>
            Forgot password?
          </S_LinkTo>
          <S_CheckBoxContainer>
            <CheckBox isChecked={isSigned} onClickEvent={handleIsSigned}>
              Stay signed in
            </CheckBox>
          </S_CheckBoxContainer>
          <S_ButtounContainer>
            <GoogleButton>Log in with Google</GoogleButton>
            <Button variant="point" shape="default" size="large" fullWidth>
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
