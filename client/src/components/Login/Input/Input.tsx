import {
  S_InputContainerWrap,
  S_LoginInputLabel,
  S_EmailAndPasswordInput,
  S_CheckBox,
  S_Label,
} from './Input.styles';

interface emailProps {
  emailValue: string;
  changeEventHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EmailInput({ emailValue, changeEventHandler }: emailProps) {
  return (
    <>
      <S_LoginInputLabel htmlFor="email">email</S_LoginInputLabel>
      <S_EmailAndPasswordInput
        type="email"
        id="email"
        value={emailValue}
        onChange={changeEventHandler}
      />
    </>
  );
}

interface passwordProps {
  passwordValue: string;
  changeEventHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordInput({
  passwordValue,
  changeEventHandler,
}: passwordProps) {
  return (
    <>
      <S_LoginInputLabel htmlFor="password">password</S_LoginInputLabel>
      <S_EmailAndPasswordInput
        type="password"
        id="password"
        value={passwordValue}
        onChange={changeEventHandler}
      />
    </>
  );
}

export function AccountRecovery() {
  return (
    <S_InputContainerWrap>
      <S_LoginInputLabel htmlFor="email">email</S_LoginInputLabel>
      <S_EmailAndPasswordInput type="text" id="email" />
    </S_InputContainerWrap>
  );
}

interface IProps {
  isChecked: boolean;
  children: React.ReactNode;
  onClickEvent: () => void;
}

export function CheckBox({ isChecked, children, onClickEvent }: IProps) {
  return (
    <>
      <S_CheckBox
        type="checkbox"
        onClick={onClickEvent}
        isChecked={isChecked}
      ></S_CheckBox>
      <S_Label htmlFor="checkbox">{children}</S_Label>
    </>
  );
}
