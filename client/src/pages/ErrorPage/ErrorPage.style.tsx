import styled from 'styled-components';
import { ColFlex, RowFlex } from '../../styles/GlobalStyles';
import BackgroundImage from '../../assets/imgs/image5.jpg';

export const S_ErrorPageWrap = styled.main`
  width: 100%;
  height: calc(100vh - 70px); /* 100vh - 헤더크기 */
  position: absolute;
  background: url(${BackgroundImage}) no-repeat;
  background-size: cover;
  ${RowFlex}
  align-items: center;
`;

export const S_ErrorPageContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.931);
  border-radius: var(--box-radius-10);
  text-align: center;
  width: 640px;
  height: 385px;
  padding: 20px 50px;
  box-sizing: border-box;
`;

export const S_ErrorBox = styled.div`
  ${ColFlex}
  width: 100%;
  height: 100%;
`;

export const S_TextContainer = styled.div`
  margin-bottom: 50px;
`;

export const S_ErrorTitleH1 = styled.h1`
  color: var(--color-primary-green);
  font-size: 6rem;
`;

export const S_ErrorSubTitleBold = styled.strong`
  color: var(--color-primary-black);
  font-size: var(--font-size-l);
`;

export const S_ErrorSubTitleP = styled.p`
  color: var(--color-primary-black);
  margin-top: 10px;
`;

export const S_ButtonContainer = styled.div`
  ${ColFlex}
  align-items: center;
  margin-bottom: 25px;

  > a {
    padding: 10px 40px;
  }
`;
