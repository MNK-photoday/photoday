import { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { RxTriangleDown } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import {
  S_NavLink,
  S_NavBox,
  S_LogoH1,
  S_LogoBox,
  S_LogoPoint,
  S_NavLinkIconBox,
  S_NavSpan,
  S_HeaderContainer,
  S_HeaderWrap,
} from './Header.styles';
import HeaderModal from './HeaderModal';

type HeaderProps = {
  activeSearchBar: boolean;
};

function Header({ activeSearchBar }: HeaderProps) {
  /*로그인 여부에 따라 상태 변경 (임시)*/
  const [isLogin, setIsLogin] = useState(true);
  /*유저아이콘 클릭 여부에 따라 모달 상태 변경*/
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  return (
    <S_HeaderWrap>
      <S_HeaderContainer>
        <S_LogoBox>
          <S_LogoH1>
            <Link to="/">
              pho<S_LogoPoint>to</S_LogoPoint>day
            </Link>
          </S_LogoH1>
        </S_LogoBox>
        {activeSearchBar && <SearchBar activeSearchBar={activeSearchBar} />}
        {isLogin ? (
          <S_NavBox>
            <S_NavLink to="/upload">
              <BiImageAdd className="addImage-icon" />
            </S_NavLink>
            <S_NavSpan>
              <S_NavLinkIconBox
                active={isActiveMenu}
                onClick={() => setIsActiveMenu(!isActiveMenu)}
              >
                <FaUserCircle className="user-icon" />
                <RxTriangleDown className="triangleDown-icon" />
                {isActiveMenu && <HeaderModal />}
              </S_NavLinkIconBox>
            </S_NavSpan>
          </S_NavBox>
        ) : (
          <S_NavBox>
            <S_NavLink to="/login">Login</S_NavLink>
            <S_NavLink to="/signup">SignUp</S_NavLink>
          </S_NavBox>
        )}
      </S_HeaderContainer>
    </S_HeaderWrap>
  );
}

export default Header;
