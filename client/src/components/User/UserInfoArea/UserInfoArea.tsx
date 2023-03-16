import { useState } from 'react';
import {
  S_UserInfoArea,
  S_UserNameContainer,
  S_UserName,
  S_UserLikeAndReport,
  S_UserDescription,
  S_TextButtonWrap,
  S_TextButton,
  S_DeleteAccountText,
} from './UserInfoArea.styles';
import {
  UserInfoTextarea,
  SetPasswordInput,
} from './UserInfoInput/UserInfoInput';
import { FaHeart } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { DataType } from '../../../pages/User/User';

interface IProps {
  userdata: DataType;
}

function UserInfoArea({ userdata }: IProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isChangePassWord, setIsChangePassWord] = useState(false);

  const clickEditHandler = () => {
    setIsEdit(!isEdit);
  };

  const clickChangePassWordHandler = () => {
    setIsChangePassWord(!isChangePassWord);
  };

  return (
    <S_UserInfoArea>
      <S_UserNameContainer>
        <S_UserName>{userdata.data[0].name}</S_UserName>
        <FaHeart size={18} className="likeicon" />
        <S_UserLikeAndReport>{userdata.data[0].likeCount}</S_UserLikeAndReport>
        <MdReportProblem size={20} className="reporticon" />
        <S_UserLikeAndReport>
          {userdata.data[0].reportCount}
        </S_UserLikeAndReport>
      </S_UserNameContainer>
      <S_UserDescription isEdit={isEdit}>
        {isEdit ? <UserInfoTextarea /> : userdata.data[0].description}
      </S_UserDescription>
      <S_TextButtonWrap>
        <S_TextButton isTextButtonType="edit" onClick={clickEditHandler}>
          {isEdit ? 'Save edits' : 'Edit'}
        </S_TextButton>
        {isChangePassWord && <SetPasswordInput />}
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
