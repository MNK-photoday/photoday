import * as style from '../Login/Login.styles';
import { Button } from '../../components/Login/GoogleBtn/Button.styles';
import { EmailInput } from '../../components/Login/Input/Input';
import { Link } from 'react-router-dom';
import LoginLogo from '../../components/Login/LoginLogo/LoginLogo';

function AccountRecovery() {
  return (
    <style.LoginContainerWrap>
      <style.ImgContainer />
      <style.ContentSection>
        <style.LoginContainer>
          <LoginLogo />
          <EmailInput />
          <style.PasswordGuide>
            Forgot your account’s password? <br />
            Enter your email address and we’ll send you a recovery link.
          </style.PasswordGuide>
          <Link to="/login">
            <Button isGreen={true}>Send recovery email</Button>
          </Link>
        </style.LoginContainer>
      </style.ContentSection>
    </style.LoginContainerWrap>
  );
}

export default AccountRecovery;
