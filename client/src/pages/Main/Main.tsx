import { useState } from 'react';
import { Container, ContainerWrap } from '../../styles/Layout';
import MainImage from '../../assets/imgs/image1.jpg';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import ImageCard from '../../components/common/ImageCard/ImageCard';
import {
  S_ContentImgBox,
  S_MainContentBox,
  S_MainImg,
  S_MainImgBox,
  S_MainTextBox,
  S_SearchContentBox,
  S_SearchImgBox,
  S_MainTitle,
  S_MainImageContentBox,
} from './Main.styles';

function Main() {
  const [activeTextBox, setActiveTextBox] = useState(true);

  return (
    <ContainerWrap>
      <Container>
        <S_MainContentBox>
          <S_SearchContentBox>
            <SearchBar setActiveTextBox={setActiveTextBox} />
            <S_SearchImgBox textBoxActive={activeTextBox}>
              <S_ContentImgBox>
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
              </S_ContentImgBox>
            </S_SearchImgBox>
            <S_MainTextBox textBoxActive={activeTextBox}>
              <S_MainTitle>
                free pics.
                <br /> do anyhing (CC0). <br /> make magic
              </S_MainTitle>
            </S_MainTextBox>
          </S_SearchContentBox>
          <S_MainImageContentBox>
            <S_MainImgBox>
              <S_MainImg
                src={MainImage}
                alt="인기가 많은 첫 번째 이미지"
              ></S_MainImg>
            </S_MainImgBox>
            <S_MainImgBox>
              <S_MainImg
                src={MainImage}
                alt="인기가 많은 두 번째이미지"
              ></S_MainImg>
            </S_MainImgBox>
          </S_MainImageContentBox>
        </S_MainContentBox>
      </Container>
    </ContainerWrap>
  );
}

export default Main;
