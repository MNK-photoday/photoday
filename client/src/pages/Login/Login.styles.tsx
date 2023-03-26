import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Content } from '../../styles/Layout';
import { RowFlex } from '../../styles/GlobalStyles';
import img5 from '../../assets/imgs/image5.jpg';
import img6 from '../../assets/imgs/image6.jpg';
import img7 from '../../assets/imgs/image7.jpg';
import img8 from '../../assets/imgs/image8.jpg';
import img9 from '../../assets/imgs/image9.jpg';
import img10 from '../../assets/imgs/image10.jpg';
import img11 from '../../assets/imgs/image11.jpg';

const images: string[] = [img5, img6, img7, img8, img9, img10, img11];
const randomImage = Math.floor(Math.random() * images.length);
const backgroundImage = images[randomImage];

export const S_LoginContainer = styled.main`
  display: flex;
`;

export const S_ImgContainer = styled(Content)`
  background-color: blue;
  height: 100vh;
  background: url(${backgroundImage}) no-repeat;
  background-size: cover;
`;

export const S_ContentSection = styled.section`
  width: 450px;
  position: fixed;
  right: 0;
  background: var(--white);
`;
