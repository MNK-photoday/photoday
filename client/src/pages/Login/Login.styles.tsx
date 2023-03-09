import styled from 'styled-components';
import img5 from '../../assets/imgs/image5.jpg';
import img6 from '../../assets/imgs/image6.jpg';
import img7 from '../../assets/imgs/image7.jpg';
import img8 from '../../assets/imgs/image8.jpg';
import img9 from '../../assets/imgs/image9.jpg';
import img10 from '../../assets/imgs/image10.jpg';
import img11 from '../../assets/imgs/image11.jpg';

const images: string[] = [img5, img6, img7, img8, img9, img10, img11];
const randomImg = Math.floor(Math.random() * images.length);
const backgroundImg = images[randomImg];

export const LoginContainerWrap = styled.div`
  display: flex;
`;

export const imgContainerWrap = styled.div`
  background-color: blue;
  width: 75%;
  height: 100vh;
  background: url(${backgroundImg}) no-repeat;
  background-size: cover;
`;

export const inputContainerWrap = styled.div`
  background-color: green;
  width: 25%;
  /* height: 100vh; */
`;
