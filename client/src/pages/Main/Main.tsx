import { useEffect, useState } from 'react';
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
import Skeleton from '../../components/common/Skeleton/Skeleton';
import MainSkeleton from '../../components/common/Skeleton/MainSkeleton';

function Main() {
  const [activeTextBox, setActiveTextBox] = useState(true);

  /*로딩상태 전역으로 관리할까 고민 중입니당*/
  const [loading, setLoading] = useState<boolean>(true);
  /*임시로 로딩상태 만든 코드*/
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });
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
            {!loading ? (
              <>
                <S_MainImgBox>
                  <S_MainImg src={MainImage} alt="인기있는 이미지"></S_MainImg>
                </S_MainImgBox>
                <S_MainImgBox>
                  <S_MainImg src={MainImage} alt="인기있는 이미지"></S_MainImg>
                </S_MainImgBox>
              </>
            ) : (
              <MainSkeleton count={2} />
            )}
          </S_MainImageContentBox>
        </S_MainContentBox>
      </Container>
    </ContainerWrap>
  );
}

export default Main;
