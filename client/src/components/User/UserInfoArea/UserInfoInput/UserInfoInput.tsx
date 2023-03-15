import { S_UserInfoTextarea, S_SetPasswordInput } from './UserInfoInput.styles';

export function UserInfoTextarea() {
  return <S_UserInfoTextarea name="user description" />;
}

export function SetPasswordInput() {
  return (
    <>
      <S_SetPasswordInput isCurrentInput type="text" />
      <S_SetPasswordInput isCurrentInput={false} type="text" />
    </>
  );
}
