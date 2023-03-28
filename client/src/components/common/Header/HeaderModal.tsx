import { FaHouseUser } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/authSlice';

import {
  S_HeaderModalWrap,
  S_ModalNavBox,
  S_ModalNavLink,
} from './HeaderModal.styles';

function HeaderModal() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.clear();
    dispatch(logout());
  };
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
