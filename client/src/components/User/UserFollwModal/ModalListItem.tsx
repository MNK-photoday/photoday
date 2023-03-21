import {
  S_ModalListItemContainer,
  S_UserProfile,
  S_UserIntroductionWrap,
  S_UserName,
  S_UserDescription,
} from './ModalListItem.styles';
import { data } from '../../../pages/User/User';
import { FiUserPlus, FiUserCheck, FiUserMinus } from 'react-icons/fi';

function ModalListItem() {
  const user = data.data[0];

  return (
    <S_ModalListItemContainer>
      <S_UserProfile alt="user profile" src={user.profileImageUrl} />
      <S_UserIntroductionWrap>
        <S_UserName>{user.name}</S_UserName>
        <S_UserDescription>
          {user.description.length > 6
            ? `${user.description.slice(0, 6)}...`
            : user.description}
        </S_UserDescription>
      </S_UserIntroductionWrap>
      <FiUserPlus className="follwIcon" size={22} />
      {/* <FiUserCheck className="follwIcon" size={22} /> */}
      {/* <FiUserMinus className="follwIcon" size={22} /> */}
    </S_ModalListItemContainer>
  );
}

export default ModalListItem;
