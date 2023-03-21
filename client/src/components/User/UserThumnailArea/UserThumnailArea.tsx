import { useState } from 'react';
import {
  S_UserThumnailArea,
  S_UserProfileIamge,
  S_UserFollowContainer,
  S_UserFollowWrap,
  S_UserFollowCount,
  S_UserFollow,
} from './UserThumnailArea.styles';
import Button from '../../common/Button/Button';
import UserFollwModal from '../UserFollwModal/UserFollwModal';

import { DataType } from '../../../pages/User/User';

interface User {
  userData: DataType;
}

function UserThumnailArea({ userData }: User) {
  const [followModal, setFollowModal] = useState(false);
  const user = userData.data[0];

  const clickFollowModalHandler = () => {
    setFollowModal(!followModal);
  };

  return (
    <S_UserThumnailArea>
      <S_UserProfileIamge alt="user profile" src={user.profileImageUrl} />
      <S_UserFollowContainer>
        <S_UserFollowWrap onClick={clickFollowModalHandler}>
          <S_UserFollowCount>{user.followerCount}</S_UserFollowCount>
          <S_UserFollow>Follower</S_UserFollow>
        </S_UserFollowWrap>
        <S_UserFollowWrap onClick={clickFollowModalHandler}>
          <S_UserFollowCount>{user.followingCount}</S_UserFollowCount>
          <S_UserFollow>Following</S_UserFollow>
        </S_UserFollowWrap>
      </S_UserFollowContainer>
      <Button variant="point" shape="default" size="large">
        Upload Image
      </Button>
      <Button variant="point" shape="default" size="XLarge">
        Remove Image
      </Button>
      {followModal && <UserFollwModal setFollowModal={setFollowModal} />}
    </S_UserThumnailArea>
  );
}

export default UserThumnailArea;
