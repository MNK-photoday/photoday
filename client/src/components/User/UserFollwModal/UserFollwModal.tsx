import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  S_UserFollwModalContainer,
  S_UserFollwListContainer,
  S_NoFollowGuide,
} from './UserFollwModal.styles';
import ModalListItem from './ModalListItem';
import Button from '../../common/Button/Button';
import { getFollows } from '../../../api/User';
import { RootState } from '../../../store/store';
import { MdPeopleOutline } from 'react-icons/md';

export type Follow = {
  checkFollow: boolean;
  name: string;
  userId: number;
  userProfileImage: string;
};

type Modal = {
  tap: 'follower' | 'following';
  myPage: boolean;
  setFollowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function UserFollwModal({ tap, myPage, setFollowModal }: Modal) {
  const [followList, setFollowList] = useState<Follow[]>([]);
  const id = useSelector((state: RootState) => state.auth.id);
  const followerCount = useSelector(
    (state: RootState) => state.user.followerCount,
  );
  const followingCount = useSelector(
    (state: RootState) => state.user.followingCount,
  );
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFollows(myPage ? id : userId);

        if (tap === 'follower') {
          setFollowList(response.data.userFollower);
        } else {
          setFollowList(response.data.userFollowing);
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [tap, followerCount, followingCount]);

  return (
    <S_UserFollwModalContainer>
      <S_UserFollwListContainer>
        {followList.length ? (
          followList.map((user) => (
            <ModalListItem
              key={user.userId}
              user={user}
              tap={tap}
              id={Number(id)}
              setFollowModal={setFollowModal}
            />
          ))
        ) : (
          <S_NoFollowGuide>
            <MdPeopleOutline className="peopleIcon" size={35} />
            <span>There's no one...</span>
          </S_NoFollowGuide>
        )}
      </S_UserFollwListContainer>
      <Button
        variant="point"
        shape="default"
        size="XXLarge"
        fullWidth
        clickEventHandler={() => setFollowModal(false)}
      >
        Close
      </Button>
    </S_UserFollwModalContainer>
  );
}

export default UserFollwModal;
