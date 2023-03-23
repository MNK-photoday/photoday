import { useEffect, useState } from 'react';
import {
  S_UserFollwModalContainer,
  S_UserFollwListContainer,
} from './UserFollwModal.styles';
// import ModalListItem from './ModalListItem';
import Button from '../../common/Button/Button';
import { getFollows } from '../../../api/User';

type User = {
  userId: number;
  name: string;
};

export type FollowUserData = {
  userFollowing: User[];
  userFollower: User[];
  userFollowingCount: number;
  userFollowerCount: number;
};

export type FollowData = {
  data: FollowUserData;
};

interface Modal {
  setFollowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserFollwModal({ setFollowModal }: Modal) {
  const [followList, setFollowList] = useState<FollowData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFollows();
        setFollowList(response.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  console.log('??', followList);

  return (
    <S_UserFollwModalContainer>
      <S_UserFollwListContainer>
        {/* {followList.map((follow, idx) => (
          <ModalListItem key={idx} follow={follow} />
        ))} */}
        {/* <ModalListItem />
        <ModalListItem />
        <ModalListItem />
        <ModalListItem />
        <ModalListItem />
        <ModalListItem />
        <ModalListItem /> */}
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
