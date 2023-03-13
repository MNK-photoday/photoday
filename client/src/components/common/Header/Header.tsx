import {
  Container,
  ContainerFlex,
  ContainerWrap,
} from '../../../styles/Layout';
import SearchBar from '../SearchBar/SearchBar';
import {
  S_HeaderContainerFlex,
  S_HeaderContainerWrap,
  S_HeaderContent,
  S_HeaderLink,
  S_LinkBox,
  S_Logo,
  S_LogoBox,
  S_LogoPoint,
} from './Header.styles';

function Header() {
  return (
    <S_HeaderContainerWrap>
      <S_HeaderContainerFlex>
        <S_HeaderContent>
          <S_LogoBox>
            <S_Logo>
              pho<S_LogoPoint>to</S_LogoPoint>day
            </S_Logo>
          </S_LogoBox>
          {/* 메인화면이 아닌 모든 곳에는 활성화, 메인화면에서는 비활성화 되어야함 */}
          {/* <SearchBar /> */}
          <S_LinkBox>
            <S_HeaderLink to="/login">Login</S_HeaderLink>
            <S_HeaderLink to="/signup">SignUp</S_HeaderLink>
          </S_LinkBox>
        </S_HeaderContent>
      </S_HeaderContainerFlex>
    </S_HeaderContainerWrap>
  );
}

export default Header;
