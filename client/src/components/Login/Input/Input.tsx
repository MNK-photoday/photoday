import * as style from './Input.styles';
import { FcGoogle } from 'react-icons/fc';

export function Input() {
  return (
    <style.InputContainerWrap>
      <style.LoginInputLabel htmlFor="email">email</style.LoginInputLabel>
      <style.EmailInput type="text" id="email" />
      <style.LoginInputLabel htmlFor="password">password</style.LoginInputLabel>
      <style.passwordInput type="text" id="password" />
    </style.InputContainerWrap>
  );
}

//삭제 가능성 있음
export function Login() {
  return <Input />;
}

//삭제 가능성 있음
export function Signup() {
  return <Input />;
}

export function AccountRecovery() {
  return (
    <style.InputContainerWrap>
      <style.LoginInputLabel htmlFor="email">email</style.LoginInputLabel>
      <style.EmailInput type="text" id="email" />
    </style.InputContainerWrap>
  );
}

export function CheckBox(props: { text: string }) {
  return (
    <>
      <style.CheckBox type="checkbox"></style.CheckBox>
      <style.Label htmlFor="checkbox">{props.text}</style.Label>
    </>
  );
}
