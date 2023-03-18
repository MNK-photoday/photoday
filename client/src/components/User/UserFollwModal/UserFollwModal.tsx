import {
  S_UserFollwModalContainer,
  S_UserFollwListContainer,
} from './UserFollwModal.styles';
import ModalListItem from './ModalListItem';
import Button from '../../common/Button/Button';

interface Modal {
  setFollowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserFollwModal({ setFollowModal }: Modal) {
  return (
    <S_UserFollwModalContainer>
      <S_UserFollwListContainer>
        <ModalListItem />
        <ModalListItem />
        <ModalListItem />
        <ModalListItem />
        <ModalListItem />
        <ModalListItem />
        <ModalListItem />
        <ModalListItem />
      </S_UserFollwListContainer>
      <Button
        variant="point"
        shape="default"
        size="XXLarge"
        fullWidth
        buttonClickEvent={() => setFollowModal(false)}
      >
        Close
      </Button>
    </S_UserFollwModalContainer>
  );
}

export default UserFollwModal;
