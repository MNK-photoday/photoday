import { FaHouseUser } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';

import {
  S_HeaderModalWrap,
  S_ModalNavBox,
  S_ModalNavLink,
} from './HeaderModal.styles';

function HeaderModal() {
  return (
    <S_HeaderModalWrap>
      <S_ModalNavBox>
        <FaHouseUser className="mypage-icon" />
        <S_ModalNavLink to="/mypage">MyPage</S_ModalNavLink>
      </S_ModalNavBox>
      <S_ModalNavBox>
        <IoLogOut className="logout-icon" />
        <S_ModalNavLink to="/logout">Logout</S_ModalNavLink>
      </S_ModalNavBox>
    </S_HeaderModalWrap>
  );
}

export default HeaderModal;
