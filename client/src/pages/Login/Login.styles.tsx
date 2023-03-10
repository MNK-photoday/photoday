import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Content } from '../../styles/Layout';
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

export const LoginContainer = styled.div`
  padding: 0 50px;
  height: 100vh;
`;

export const ImgContainer = styled(Content)`
  background-color: blue;
  height: 100vh;
  background: url(${backgroundImg}) no-repeat;
  background-size: cover;
`;

export const ContentSection = styled.section`
  width: 450px;
  position: fixed;
  right: 0;
  background: var(--white);
`;

export const PasswordGuide = styled.p`
  font-size: 12px;
  margin-bottom: 20px;
  color: var(--color-primary-black);
`;

export const CheckBoxContainer = styled.div`
  margin: 10px 0 20px;
`;

export const LinkToAccountRecovery = styled(Link)`
  color: var(--color-primary-green);
  font-size: var(--font-size-sm);
  display: flex;
  justify-content: end;

  &:hover {
    color: hsl(140, 40%, 44%);
  }
`;
