import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
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
  S_Textarea,
} from './UserInfoArea.styles';
// import UserInfoTextarea from './UserInfoTextarea/UserInfoTextarea';
import { FaHeart } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { validateValue } from '../../Login/LoginValidationLogic/LoginValidationLogic';
import { PasswordInput } from '../../Login/Input/Input';
import { S_InvalidMessage } from '../../../pages/Login/Login.styles';
import { User } from '../UserThumnailArea/UserThumnailArea';
import { updatePasswordUser, deleteUser, updateUser } from '../../../api/User';
import { logout } from '../../../store/authSlice';
import { setData } from '../../../store/userSlice';

function UserInfoArea({ userData }: User) {
  const dispatch = useDispatch();
  const [textareaValue, setTextareaValue] = useState(userData.description);
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

  const changedescriptionHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    setTextareaValue(value);
  };

  const clickChangePassWordHandler = () => {
    setIsChangePassWord(!isChangePassWord);
  };

  const updatePassWordHandler = async () => {
    setIsChangePassWord(!isChangePassWord);
    try {
      await updatePasswordUser({
        inputValue,
        confirminputValue,
      });
      alert('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    }
  };

  const deleteUserHandler = async () => {
    if (confirm('정말로 탈퇴하시겠습니까?')) {
      try {
        await deleteUser();
        dispatch(logout());
        alert(
          'potoday 회원탈퇴가 완료되었습니다. 그동안 potoday를 이용해 주셔서 감사합니다.',
        );
        window.location.href = '/';
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            alert(error.response.data.message);
          }
        }
      }
    } else {
      alert('취소되었습니다!');
    }
  };

  const clickUpdatedescriptionHandler = async () => {
    try {
      setIsEdit(!isEdit);
      const response = await updateUser(textareaValue);
      dispatch(setData(response));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    }
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
        {isEdit ? (
          <S_Textarea
            name="user description"
            value={textareaValue}
            onChange={changedescriptionHandler}
          />
        ) : (
          userData.description
        )}
      </S_UserDescription>
      <S_TextButtonWrap>
        {isEdit ? (
          <S_TextButton
            isTextButtonType="edit"
            onClick={clickUpdatedescriptionHandler}
          >
            Save edits
          </S_TextButton>
        ) : (
          <S_TextButton isTextButtonType="edit" onClick={clickEditHandler}>
            Edit
          </S_TextButton>
        )}
        {isChangePassWord && (
          <S_InputWrap>
            <PasswordInput
              labelValue="New password"
              passwordValue={inputValue}
              changeEventHandler={changePasswordValueHandler}
            />
            {!validValue && (
              <S_InvalidMessage isShowMessage={!validValue ? 'show' : 'hide'}>
                Passwords must contain 8 to 20 characters in English, numbers,
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
        {isChangePassWord ? (
          <S_TextButton
            isTextButtonType="changePassword"
            onClick={updatePassWordHandler}
          >
            Save Password
          </S_TextButton>
        ) : (
          <S_TextButton
            isTextButtonType="changePassword"
            onClick={clickChangePassWordHandler}
          >
            Change Password
          </S_TextButton>
        )}
        <S_TextButton
          isTextButtonType="deleteAccount"
          onClick={deleteUserHandler}
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