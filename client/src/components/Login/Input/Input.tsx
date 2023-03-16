import {
  S_InputContainerWrap,
  S_InputLabel,
  S_Input,
  S_CheckBox,
  S_Label,
} from './Input.styles';

interface EmailProps {
  emailValue: string;
  changeEventHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EmailInput({ emailValue, changeEventHandler }: EmailProps) {
  return (
    <>
      <S_InputLabel htmlFor="email">email</S_InputLabel>
      <S_Input
        type="email"
        id="email"
        value={emailValue}
        onChange={changeEventHandler}
      />
    </>
  );
}

interface PasswordProps {
  passwordValue: string;
  changeEventHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordInput({
  passwordValue,
  changeEventHandler,
}: PasswordProps) {
  return (
    <>
      <S_InputLabel htmlFor="password">password</S_InputLabel>
      <S_Input
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
      <S_InputLabel htmlFor="email">email</S_InputLabel>
      <S_Input type="text" id="email" />
    </S_InputContainerWrap>
  );
}

interface CheckBoxProps {
  isChecked: boolean;
  children: React.ReactNode;
  onClickEvent: () => void;
}

export function CheckBox({ isChecked, children, onClickEvent }: CheckBoxProps) {
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
