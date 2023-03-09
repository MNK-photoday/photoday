import {
  Container,
  ContainerFlex,
  ContainerWrap,
} from '../../../styles/Layout';
import SearchBar from '../SearchBar/SearchBar';
import * as style from './Header.styles';

function Header() {
  return (
    <style.HeaderContainerWrap>
      <style.HeaderContainerFlex>
        <style.HeaderContent>
          <style.LogoBox>
            <style.Logo>
              Pho<style.LogoPoint>to</style.LogoPoint>day
            </style.Logo>
            <style>
              Pho<style.LogoPoint>to</style.LogoPoint>day
            </style>
          </style.LogoBox>
          <SearchBar />
          <style.LinkBox>
            <style.HeaderLink to="/login">Login</style.HeaderLink>
            <style.HeaderLink to="/signup">SignUp</style.HeaderLink>
          </style.LinkBox>
        </style.HeaderContent>
      </style.HeaderContainerFlex>
    </style.HeaderContainerWrap>
  );
}

export default Header;
