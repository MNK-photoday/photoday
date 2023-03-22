import { useState, useEffect } from 'react';
import {
  S_UserInfoArea,
  S_UserNameContainer,
  S_UserName,
  S_UserLikeAndReport,
  S_UserDescription,
  S_TextButtonWrap,
  S_TextButton,
  S_DeleteAccountText,
  S_InputWrap,
} from './UserInfoArea.styles';
import UserInfoTextarea from './UserInfoTextarea/UserInfoTextarea';
import { FaHeart } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { validateValue } from '../../Login/LoginValidationLogic/LoginValidationLogic';
import { PasswordInput } from '../../Login/Input/Input';
import { S_InvalidMessage } from '../../../pages/Login/Login.styles';
import { User } from '../UserThumnailArea/UserThumnailArea';

function UserInfoArea({ userData }: User) {
  const [inputValue, setInputValue] = useState('');
  const [confirminputValue, setconfirmInputValue] = useState('');
  const [validValue, setValidValue] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isChangePassWord, setIsChangePassWord] = useState(false);
  const VALUE_TYPE = 'password';
  const confirmValue = inputValue !== confirminputValue;

  useEffect(() => {
    validateValue({ inputValue, setValidValue, VALUE_TYPE });
  }, [inputValue]);

  const clickEditHandler = () => {
    setIsEdit(!isEdit);
  };

  const changePasswordValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const changeConfirmPasswordHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setconfirmInputValue(value);
  };

  const clickChangePassWordHandler = () => {
    setIsChangePassWord(!isChangePassWord);
  };

  return (
    <S_UserInfoArea>
      <S_UserNameContainer>
        <S_UserName>{userData.name}</S_UserName>
        <FaHeart size={20} className="likeicon" />
        <S_UserLikeAndReport>{userData.likeCount}</S_UserLikeAndReport>
        {/* <TbPhotoCancel size={25} className="reporticon" /> */}
        {/* <RiAlarmWarningLine size={25} className="reporticon" /> */}
        <IoWarningOutline size={25} className="reporticon" />
        <S_UserLikeAndReport>{userData.reportCount}</S_UserLikeAndReport>
      </S_UserNameContainer>
      <S_UserDescription isEdit={isEdit}>
        {isEdit ? <UserInfoTextarea /> : userData.description}
      </S_UserDescription>
      <S_TextButtonWrap>
        <S_TextButton isTextButtonType="edit" onClick={clickEditHandler}>
          {isEdit ? 'Save edits' : 'Edit'}
        </S_TextButton>
        {isChangePassWord && (
          <S_InputWrap>
            <PasswordInput
              labelValue="New password"
              passwordValue={inputValue}
              changeEventHandler={changePasswordValueHandler}
            />
            {!validValue && (
              <S_InvalidMessage isShowMessage={!validValue ? 'show' : 'hide'}>
                Passwords must contain 8 to 16 characters in English, numbers,
                and special characters.
              </S_InvalidMessage>
            )}
            <PasswordInput
              labelValue="Confirm new password"
              passwordValue={confirminputValue}
              changeEventHandler={changeConfirmPasswordHandler}
            />
            {confirmValue && (
              <S_InvalidMessage isShowMessage={confirmValue ? 'show' : 'hide'}>
                Passwords do not match.
              </S_InvalidMessage>
            )}
            <S_TextButton
              isTextButtonType="cancel"
              onClick={clickChangePassWordHandler}
            >
              Cancel
            </S_TextButton>
          </S_InputWrap>
        )}
        <S_TextButton
          isTextButtonType="changePassword"
          onClick={clickChangePassWordHandler}
        >
          {isChangePassWord ? 'Save Password' : 'Change Password'}
        </S_TextButton>
        <S_TextButton
          isTextButtonType="deleteAccount"
          onClick={() => alert('정말로 탈퇴하시겠습니까?')}
        >
          Delete account
        </S_TextButton>
        <S_DeleteAccountText>
          Once you delete your account, there is no going back. Please be
          certain.
        </S_DeleteAccountText>
      </S_TextButtonWrap>
    </S_UserInfoArea>
  );
}

export default UserInfoArea;
