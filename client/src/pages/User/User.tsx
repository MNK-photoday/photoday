import React from 'react';
import {
  S_UserPageContainer,
  S_UserSection,
  S_UserThumnailArea,
  S_UserProfileIamge,
  S_UserFollowContainer,
  S_UserFollow,
  S_UserInfoArea,
  S_UserPageTitle,
  S_UserPhotoContentBox,
  S_UserPhotoContent,
  S_Pagination,
  S_Button,
} from './User.styles';
import { ContainerWrap } from '../../styles/Layout';
import oceanImage from '../../assets/imgs/image9.jpg';
import kungyaImage from '../../assets/imgs/kungyaImage.png';

const data = {
  data: {
    userId: 1,
    name: 'test',
    profileImageUrl:
      'https://cdn.discordapp.com/attachments/1082610363712950272/1082610364371435540/userImage.png',
    description: '안녕하세요!',
    likeCount: 0,
    reportCount: 0,
    followerCount: 0,
    followingCount: 0,
    checkFollow: false,
  },
};

function Users() {
  return (
    <ContainerWrap>
      <S_UserPageContainer>
        <S_UserSection>
          <S_UserThumnailArea>
            <S_UserProfileIamge
              alt="user profile"
              src={data.data.profileImageUrl}
            />
            <S_UserFollowContainer>
              <div>
                <S_UserFollow>{data.data.followerCount}</S_UserFollow>
                <S_UserFollow>Follower</S_UserFollow>
              </div>
              <div>
                <S_UserFollow>{data.data.followingCount}</S_UserFollow>
                <S_UserFollow>Following</S_UserFollow>
              </div>
            </S_UserFollowContainer>
            <S_Button variant="point" shape="default" size="small">
              Upload Image
            </S_Button>
            <S_Button variant="point" shape="default" size="small">
              Remove Image
            </S_Button>
          </S_UserThumnailArea>
          <S_UserInfoArea>user info</S_UserInfoArea>
        </S_UserSection>
        <S_UserPageTitle>
          <h3>{`${data.data.name}'s photoday`}</h3>
          <div>bookmark Icon</div>
        </S_UserPageTitle>
        <S_UserPhotoContentBox>
          <S_UserPhotoContent alt="photo" src={oceanImage} />
          <S_UserPhotoContent alt="photo" src={kungyaImage} />
          <S_UserPhotoContent alt="photo" src={oceanImage} />
          <S_UserPhotoContent alt="photo" src={oceanImage} />
          <S_UserPhotoContent alt="photo" src={oceanImage} />
          <S_UserPhotoContent alt="photo" src={oceanImage} />
        </S_UserPhotoContentBox>
        <S_Pagination>1 2 3 4 5 6</S_Pagination>
      </S_UserPageContainer>
    </ContainerWrap>
  );
}

export default Users;
