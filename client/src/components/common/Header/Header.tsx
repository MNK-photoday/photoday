import {
  Container,
  ContainerFlex,
  ContainerWrap,
} from '../../../styles/Layout';
import {
  HeaderContainerFlex,
  HeaderContainerWrap,
  HeaderContent,
} from './Header.styles';

function Header() {
  return (
    <HeaderContainerWrap>
      <HeaderContainerFlex>
        <HeaderContent>
          <h1>헤더</h1>
        </HeaderContent>
      </HeaderContainerFlex>
    </HeaderContainerWrap>
  );
}

export default Header;
