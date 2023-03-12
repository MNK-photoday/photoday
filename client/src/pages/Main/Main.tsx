import { Container, ContainerWrap } from '../../styles/Layout';
import * as style from './Main.styles';

import image1 from '../../assets/imgs/image1.jpg';
import SearchBar from '../../components/common/SearchBar/SearchBar';
function Main() {
  return (
    <ContainerWrap>
      <Container>
        <style.MainContentBox>
          <style.MainContent>
            <style.SearchContentBox>
              <SearchBar />
              <style.SearchImgBox></style.SearchImgBox>
              <style.MainTextBox>
                <style.MainTextSpan>
                  free pics.
                  <br /> do anyhing (CC0). <br /> make magic
                </style.MainTextSpan>
              </style.MainTextBox>
            </style.SearchContentBox>
          </style.MainContent>
          <style.MainContent>
            <style.MainImgBox>
              <style.MainImg src={image1}></style.MainImg>
            </style.MainImgBox>
            <style.MainImgBox>
              <style.MainImg src={image1}></style.MainImg>
            </style.MainImgBox>
          </style.MainContent>
        </style.MainContentBox>
      </Container>
    </ContainerWrap>
  );
}

export default Main;
