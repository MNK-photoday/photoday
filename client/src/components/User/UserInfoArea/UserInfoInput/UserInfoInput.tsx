import { S_Textarea, S_InputLabel, S_Input } from './UserInfoInput.styles';

export function UserInfoTextarea() {
  return <S_Textarea name="user description" />;
}

export function SetPasswordInput() {
  return (
    <>
      <S_InputLabel htmlFor="password">New password</S_InputLabel>
      <S_Input type="password" />
      <S_InputLabel htmlFor="email">Confirm new password</S_InputLabel>
      <S_Input type="password" />
    </>
  );
}
