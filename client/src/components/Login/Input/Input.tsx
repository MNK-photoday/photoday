import {
  S_InputContainerWrap,
  S_LoginInputLabel,
  S_EmailInput,
  S_PasswordInput,
  S_CheckBox,
  S_Label,
} from './Input.styles';
import React from 'react';

export function Input() {
  return (
    <S_InputContainerWrap>
      <S_LoginInputLabel htmlFor="email">email</S_LoginInputLabel>
      <S_EmailInput type="text" id="email" />
      <S_LoginInputLabel htmlFor="password">password</S_LoginInputLabel>
      <S_PasswordInput type="text" id="password" />
    </S_InputContainerWrap>
  );
}

export function EmailInput() {
  return (
    <S_InputContainerWrap>
      <S_LoginInputLabel htmlFor="email">email</S_LoginInputLabel>
      <S_EmailInput type="text" id="email" />
    </S_InputContainerWrap>
  );
}

export function AccountRecovery() {
  return (
    <S_InputContainerWrap>
      <S_LoginInputLabel htmlFor="email">email</S_LoginInputLabel>
      <S_EmailInput type="text" id="email" />
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
