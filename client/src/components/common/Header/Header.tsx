import { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { RxTriangleDown } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useSelector } from 'react-redux';

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
  S_UserProfile,
} from './Header.styles';
import HeaderModal from './HeaderModal';
import { RootState } from '../../../store/store';

type HeaderProps = {
  activeSearchBar: boolean;
};

function Header({ activeSearchBar }: HeaderProps) {
  const { isLoggedIn, userProfileImage } = useSelector(
    (state: RootState) => state.auth,
  );
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
        {isLoggedIn ? (
          <S_NavBox>
            <S_NavLink to="/upload">
              <BiImageAdd className="addImage-icon" />
            </S_NavLink>
            <S_NavSpan>
              <S_NavLinkIconBox
                active={isActiveMenu}
                onClick={() => setIsActiveMenu(!isActiveMenu)}
              >
                <S_UserProfile alt="유저 프로필 사진" src={userProfileImage} />
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
