import { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { RxTriangleDown } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import {
  S_HeaderContainerFlex,
  S_HeaderContainerWrap,
  S_HeaderContent,
  S_NavLink,
  S_NavBox,
  S_LogoH1,
  S_LogoBox,
  S_LogoPoint,
  S_NavLinkIconBox,
  S_NavSpan,
} from './Header.styles';
import HeaderModal from './HeaderModal';

function Header() {
  /*로그인 여부에 따라 상태 변경*/
  const [isLogin, setIsLogin] = useState(false);
  /*유저아이콘 클릭 여부에 따라 상태 변경*/
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  return (
    <S_HeaderContainerWrap>
      <S_HeaderContainerFlex>
        <S_HeaderContent>
          <S_LogoBox>
            <S_LogoH1>
              <Link to="/">
                pho<S_LogoPoint>to</S_LogoPoint>day
              </Link>
            </S_LogoH1>
          </S_LogoBox>
          {/* 메인화면이 아닌 모든 곳에는 활성화, 메인화면에서는 비활성화 되는 로직 구현 */}
          {/* <SearchBar /> */}
          {isLogin ? (
            <S_NavBox>
              <S_NavLink to="/upload">
                <BiImageAdd className="addImage-icon" />
              </S_NavLink>
              <S_NavSpan>
                <S_NavLinkIconBox
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
        </S_HeaderContent>
      </S_HeaderContainerFlex>
    </S_HeaderContainerWrap>
  );
}

export default Header;
