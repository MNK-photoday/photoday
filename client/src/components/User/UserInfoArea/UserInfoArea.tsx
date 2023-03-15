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
  S_PostImageButton,
} from './UserInfoArea.styles';
import { FaHeart } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { BsFillImageFill } from 'react-icons/bs';
import { DataType } from '../../../pages/User/User';
import {
  UserInfoTextarea,
  SetPasswordInput,
} from './UserInfoInput/UserInfoInput';

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

  const clickDeleteAccountHandler = () => {
    alert('이메일 주소에 @를 입력해주세요');
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
        {/* 버튼 꼭 필요한지 물어보기 */}
        <S_PostImageButton>
          <BsFillImageFill size={18} className="postImageButton" />
          Post Images
        </S_PostImageButton>
      </S_UserNameContainer>
      <S_UserDescription isEdit={isEdit}>
        {isEdit ? <UserInfoTextarea /> : userdata.data[0].description}
      </S_UserDescription>
      <S_TextButtonWrap>
        {/*
        //! 내용 바꾼댄다
        */}
        <S_TextButton isTextButtonType="edit" onClick={clickEditHandler}>
          {isEdit ? 'Save edits' : 'Edit'}
        </S_TextButton>
        {/*
        //! 비밀번호 바꾼댄다
        */}
        {isChangePassWord && (
          <>
            <SetPasswordInput />
          </>
        )}
        <S_TextButton
          isTextButtonType="changePassword"
          onClick={clickChangePassWordHandler}
        >
          {isChangePassWord ? 'Save Password' : 'Change Password'}
        </S_TextButton>
        {/*
        //! 계정 삭제한댄다
         */}
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
