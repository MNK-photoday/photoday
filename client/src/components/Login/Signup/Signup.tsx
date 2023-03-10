import Logo from '../Logo/Logo';
import { Input } from '../Input/Input';
import * as style from '../Login/Login.styles';

function Signup() {
  return (
    <style.LoginContainerWrap>
      <Logo />
      <Input />
      <style.PasswordGuide>
        Passwords must contain at least eight characters,
        <br /> including at least 1 letter and 1 number.
      </style.PasswordGuide>
    </style.LoginContainerWrap>
  );
}

export default Signup;
