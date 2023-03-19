import styled from 'styled-components';
import { RowFlex } from '../../styles/GlobalStyles';

export const S_MainContentBox = styled.div`
  ${RowFlex}
  height: 100%;
  padding: 40px 0;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;

export const S_MainImageContentBox = styled.section`
  width: 700px;
`;

export const S_MainImgBox = styled.article`
  width: 100%;
  height: 390px;
  &:first-child {
    margin-bottom: 10px;
  }
`;

export const S_MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const S_SearchContentBox = styled.section`
  width: 48%;
  height: 450px;
  position: relative;
  margin: 31px 0;
`;

export const S_SearchImgBox = styled.div`
  width: 100%;
  height: ${({ textBoxActive }: { textBoxActive: boolean }) =>
    textBoxActive ? '0%' : '400px'};
  visibility: ${({ textBoxActive }: { textBoxActive: boolean }) =>
    textBoxActive ? 'hidden' : 'visible'};
  transition: 1s;
  overflow-y: scroll;
  margin: 10px 0;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: var(--color-primary-gray20);
  }
`;
export const S_ContentImgBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 5px;
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
