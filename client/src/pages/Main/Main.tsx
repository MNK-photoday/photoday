import { useState } from 'react';
import { Container, ContainerWrap } from '../../styles/Layout';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import {
  S_MainContentBox,
  S_MainTextBox,
  S_SearchContentBox,
  S_SearchImgBox,
  S_MainTitle,
} from './Main.styles';
import ImageCardList from '../../components/common/ImageCardList/ImageCardList';
import MainImageCard from '../../components/common/ImageCard/MainImageCard';

function Main() {
  const [activeTextBox, setActiveTextBox] = useState(true);

  return (
    <ContainerWrap>
      <Container>
        <S_MainContentBox>
          <S_SearchContentBox>
            <SearchBar setActiveTextBox={setActiveTextBox} />
            <S_SearchImgBox textBoxActive={activeTextBox}>
              <ImageCardList width={240} height={180} />
            </S_SearchImgBox>
            <S_MainTextBox textBoxActive={activeTextBox}>
              <S_MainTitle>
                free pics.
                <br /> do anyhing (CC0). <br /> make magic
              </S_MainTitle>
            </S_MainTextBox>
          </S_SearchContentBox>
          <MainImageCard />
        </S_MainContentBox>
      </Container>
    </ContainerWrap>
  );
}

export default Main;
