import { FaHouseUser } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';

import {
  S_HeaderModalWrap,
  S_ModalNavBox,
  S_ModalNavLink,
} from './HeaderModal.styles';

const logoutHandler = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('id');
};

function HeaderModal() {
  return (
    <S_HeaderModalWrap>
      <S_ModalNavBox>
        <FaHouseUser className="users-icon" />
        <S_ModalNavLink to="/users">MyPage</S_ModalNavLink>
      </S_ModalNavBox>
      <S_ModalNavBox>
        <IoLogOut className="logout-icon" />
        <S_ModalNavLink to="/" onClick={logoutHandler}>
          Logout
        </S_ModalNavLink>
      </S_ModalNavBox>
    </S_HeaderModalWrap>
  );
}

export default HeaderModal;
