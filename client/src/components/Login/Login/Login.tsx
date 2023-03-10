import Logo from '../Logo/Logo';
import { Input, CheckBox } from '../Input/Input';
import { GoogleButton, Button } from '../Button/Button';
import * as style from './Login.styles';

export interface IProps {
  name: string;
}

function Login() {
  return (
    <style.LoginContainerWrap>
      <Logo />
      <Input />
      <style.CheckBoxContainerWrap>
        <CheckBox text="Stay signed in" />
      </style.CheckBoxContainerWrap>
      <GoogleButton text="Log in with Google" />
      <Button text="Log in with Google" />
    </style.LoginContainerWrap>
  );
}

export default Login;
