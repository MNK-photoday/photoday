import {
  S_LoginContainerWrap,
  S_ImgContainer,
  S_ContentSection,
  S_LoginContainer,
  S_PasswordGuide,
} from '../Login/Login.styles';
import { EmailInput } from '../../components/Login/Input/Input';
import { Link } from 'react-router-dom';
import LoginLogo from '../../components/Login/LoginLogo/LoginLogo';
import Button from '../../components/common/Button/Button';

function AccountRecovery() {
  return (
    <S_LoginContainerWrap>
      <S_ImgContainer />
      <S_ContentSection>
        <S_LoginContainer>
          <LoginLogo />
          <EmailInput />
          <S_PasswordGuide>
            Forgot your account’s password? <br />
            Enter your email address and we’ll send you a recovery link.
          </S_PasswordGuide>
          <Link to="/login">
            <Button variant="point" shape="default" size="large" fullWidth>
              Send recovery email
            </Button>
          </Link>
        </S_LoginContainer>
      </S_ContentSection>
    </S_LoginContainerWrap>
  );
}

export default AccountRecovery;
