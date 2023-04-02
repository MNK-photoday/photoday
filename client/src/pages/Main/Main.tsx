import { useState, useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { socialLogin } from '../../api/Login';
import MainImageCard from '../../components/common/ImageCard/MainImageCard';

function Main() {
  const dispatch = useDispatch();
  const [activeTextBox, setActiveTextBox] = useState(true);

  useEffect(() => {
    if (window.location.href.includes('userId')) {
      const { userId, userProfileImage } = socialLogin();
      dispatch(login({ userId, userProfileImage }));
      const url = window.location.href.split('?')[0];
      window.history.replaceState({}, document.title, url);
    }
  }, []);

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
