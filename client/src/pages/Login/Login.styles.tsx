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

export const S_LoginContainerWrap = styled.div`
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

export const S_LoginContainer = styled.form`
  padding: 0 50px;
  height: 100vh;
`;

export const S_PasswordGuide = styled.p`
  font-size: 12px;
  margin-bottom: 20px;
  color: var(--color-primary-black);
`;

export const S_CheckBoxContainer = styled.div`
  display: flex;
  margin: 10px 0 20px;
`;

export const S_ButtounContainer = styled.div`
  margin-bottom: 20px;
`;

export const S_LinkToTextContainer = styled.div`
  ${RowFlex}
  font-size: var(--font-size-sm);
`;

type LinkProps = {
  isaccount: string;
};

export const S_LinkTo = styled(Link)<LinkProps>`
  color: var(--color-primary-green);
  margin-left: 10px;
  font-weight: bold;

  ${({ isaccount }) =>
    isaccount === 'true' &&
    `
    font-size: var(--font-size-sm);
    font-weight: normal;
    display: flex;
    justify-content: end;
    position: relative;
    bottom: 10px;
  `};

  &:hover {
    color: hsl(140, 40%, 44%);
  }
`;

export type ShowMessageType = 'show' | 'hide';

const InvalidMessageCSS = {
  show: css`
    position: relative;
    bottom: 10px;
    left: 2px;
    color: var(--color-primary-red);
    font-size: var(--font-size-sm);
  `,
  hide: css`
    display: none;
  `,
};

export const S_InvalidMessage = styled.p<{ isShowMessage: ShowMessageType }>`
  ${({ isShowMessage }) => InvalidMessageCSS[isShowMessage]}
`;
