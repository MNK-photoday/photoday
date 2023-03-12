import * as style from './Input.styles';

export function Input() {
  return (
    <style.InputContainerWrap>
      <style.LoginInputLabel htmlFor="email">email</style.LoginInputLabel>
      <style.EmailInput type="text" id="email" />
      <style.LoginInputLabel htmlFor="password">password</style.LoginInputLabel>
      <style.PasswordInput type="text" id="password" />
    </style.InputContainerWrap>
  );
}

export function EmailInput() {
  return (
    <style.InputContainerWrap>
      <style.LoginInputLabel htmlFor="email">email</style.LoginInputLabel>
      <style.EmailInput type="text" id="email" />
    </style.InputContainerWrap>
  );
}

export function AccountRecovery() {
  return (
    <style.InputContainerWrap>
      <style.LoginInputLabel htmlFor="email">email</style.LoginInputLabel>
      <style.EmailInput type="text" id="email" />
    </style.InputContainerWrap>
  );
}

interface IProps {
  text: string;
  handleonChecked: () => void;
}

export function CheckBox(props: IProps) {
  return (
    <>
      <style.CheckBox
        type="checkbox"
        onClick={props.handleonChecked}
      ></style.CheckBox>
      <style.Label htmlFor="checkbox">{props.text}</style.Label>
    </>
  );
}
