import styled from 'styled-components';
import { RowFlex } from '../../styles/GlobalStyles';

export const S_MainContentBox = styled.main`
  ${RowFlex}
  height: 100%;
  padding: 40px 0;
  box-sizing: border-box;
  /* 전체높이 - 헤더높이 - 푸터높이*/
  height: calc(100vh - 60px - 30px);
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const S_MainContent = styled.section`
  width: 47%;
  ${RowFlex};
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  &:first-child {
    margin-left: 45px;
  }
`;

export const S_MainImgBox = styled.article`
  ${RowFlex}
  width: 85%;
  height: 48%;
  position: relative;
`;

export const S_MainImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const S_SearchContentBox = styled.article`
  width: 100%;
  height: 50%;
  position: relative;
`;

export const S_SearchImgBox = styled.div`
  margin-top: 20px;
  width: 100%;
  height: ${({ textBoxActive }: { textBoxActive: boolean }) =>
    textBoxActive ? '0%' : '100%'};
  visibility: ${({ textBoxActive }: { textBoxActive: boolean }) =>
    textBoxActive ? 'hidden' : 'visible'};
  transition: 1s;
  overflow-y: scroll;
`;
export const S_ContentImgBox = styled.div`
  ${RowFlex}
  flex-wrap: wrap;
  padding: 10px 0;
`;
export const S_MainTitle = styled.h1`
  font-size: var(--font-size-xxxl);
  color: var(--color-primary-black);
  font-weight: 500;
  line-height: 1.2;
`;

export const S_MainTextBox = styled.div`
  width: 100%;
  margin-top: 50px;
  position: absolute;
  opacity: ${({ textBoxActive }: { textBoxActive: boolean }) =>
    textBoxActive ? 1 : 0};
  transition: 1s;
`;
