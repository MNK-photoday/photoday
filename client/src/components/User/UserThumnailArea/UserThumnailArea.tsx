import {
  S_UserThumnailArea,
  S_UserProfileIamge,
  S_UserFollowContainer,
  S_UserFollowCount,
  S_UserFollow,
} from './UserThumnailArea.styles';
import Button from '../../common/Button/Button';

import { DataType } from '../../../pages/User/User';

interface IProps {
  userData: DataType;
}

function UserThumnailArea({ userData }: IProps) {
  return (
    <S_UserThumnailArea>
      <S_UserProfileIamge
        alt="user profile"
        src={userData.data[0].profileImageUrl}
      />
      <S_UserFollowContainer>
        <div>
          <S_UserFollowCount>
            {userData.data[0].followerCount}
          </S_UserFollowCount>
          <S_UserFollow>Follower</S_UserFollow>
        </div>
        <div>
          <S_UserFollowCount>
            {userData.data[0].followingCount}
          </S_UserFollowCount>
          <S_UserFollow>Following</S_UserFollow>
        </div>
      </S_UserFollowContainer>
      <Button variant="point" shape="default" size="large">
        Upload Image
      </Button>
      <Button variant="point" shape="default" size="XLarge">
        Remove Image
      </Button>
    </S_UserThumnailArea>
  );
}

export default UserThumnailArea;
