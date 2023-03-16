import {
  S_UserInfoTextarea,
  S_SetPasswordInputLabel,
  S_SetPasswordInput,
} from './UserInfoInput.styles';

export function UserInfoTextarea() {
  return <S_UserInfoTextarea name="user description" />;
}

export function SetPasswordInput() {
  return (
    <>
      <S_SetPasswordInputLabel htmlFor="password">
        New password
      </S_SetPasswordInputLabel>
      <S_SetPasswordInput type="password" />
      <S_SetPasswordInputLabel htmlFor="email">
        Confirm new password
      </S_SetPasswordInputLabel>
      <S_SetPasswordInput type="password" />
    </>
  );
}
