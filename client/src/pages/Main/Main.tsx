<<<<<<< HEAD
import { useContext, useState, useEffect } from 'react';
=======
import { useState } from 'react';
>>>>>>> 9dbe0701323679a6dd8328df0c57233d9239d90f
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
<<<<<<< HEAD
import { LoadingContext } from '../../context/LoadintContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { socialLogin } from '../../api/Login';
=======
import MainImageCard from '../../components/common/ImageCard/MainImageCard';
>>>>>>> 9dbe0701323679a6dd8328df0c57233d9239d90f

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTextBox, setActiveTextBox] = useState(true);

  useEffect(() => {
    if (window.location.href.includes('userId')) {
      const { userId, userProfileImage } = socialLogin();
      dispatch(login({ userId, userProfileImage }));
      const url = window.location.href.split('?')[0];
      window.history.replaceState({}, document.title, url);
    }
  }, [navigate]);

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
