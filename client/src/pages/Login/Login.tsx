import * as style from './Login.styles';
import { Input, CheckBox } from '../../components/Login/Input/Input';
import { GoogleButton } from '../../components/Login/GoogleBtn/GoogleBtn';
import { Button } from '../../components/Login/GoogleBtn/Button.styles';
import LoginLogo from '../../components/Login/LoginLogo/LoginLogo';
import LinkText from '../../components/Login/LinkText/LinkText';

function Login() {
  return (
    <style.LoginContainerWrap>
      <style.ImgContainer />
      <style.ContentSection>
        <style.LoginContainer>
          <LoginLogo />
          <Input />
          <style.LinkToAccountRecovery to="/account-recovery">
            Forgot password?
          </style.LinkToAccountRecovery>
          <style.CheckBoxContainer>
            {/* <CheckBox text="Stay signed in" /> */}
          </style.CheckBoxContainer>
          <GoogleButton text="Log in with Google" />
          <Button isGreen={true}>Log in</Button>
          <LinkText text="Don’t have an account?" linkTo="Sign Up" />
        </style.LoginContainer>
      </style.ContentSection>
    </style.LoginContainerWrap>
  );
}

export default Login;
