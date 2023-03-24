import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import {
  S_ModalListItemContainer,
  S_UserProfile,
  S_UserIntroductionWrap,
  S_UserName,
  S_UserDescription,
} from './ModalListItem.styles';
import { FiUserPlus, FiUserCheck, FiUserMinus } from 'react-icons/fi';
import { Follow } from './UserFollwModal';
import { setData } from '../../../store/userSlice';
import { patchFollow } from '../../../api/User';
import { setFollower, setfollowing } from '../../../store/userSlice';

type FollowData = {
  user: Follow;
  tap: string;
};

function ModalListItem({ user, tap }: FollowData) {
  const dispatch = useDispatch();
  console.log('뭐고', user);
  const followHandler = async (type: string) => {
    try {
      await patchFollow(user.userId);
      if (tap === 'follower' && type === 'minus') {
        dispatch(setFollower(-1));
      } else if (tap === 'follower' && type === 'plus') {
        dispatch(setFollower(1));
      } else if (tap === 'following' && type === 'minus') {
        dispatch(setfollowing(-1));
      } else if (tap === 'following' && type === 'plus') {
        dispatch(setfollowing(1));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    }
  };

  return (
    <S_ModalListItemContainer>
      <S_UserProfile alt="user profile" src={user.userProfileImage} />
      <S_UserIntroductionWrap>
        <S_UserName to={`/users/${user.userId}`}>
          {user.name.length > 10 ? `${user.name.slice(0, 10)}...` : user.name}
        </S_UserName>
      </S_UserIntroductionWrap>
      {user.checkFollow ? (
        <FiUserMinus
          className="follwIcon"
          size={22}
          onClick={() => followHandler('minus')}
        />
      ) : (
        <FiUserPlus
          className="follwIcon"
          size={22}
          onClick={() => followHandler('plus')}
        />
      )}
    </S_ModalListItemContainer>
  );
}

export default ModalListItem;
