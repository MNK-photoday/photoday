import styled from 'styled-components';
import { RowFlex } from '../../styles/GlobalStyles';

export const S_MainContentBox = styled.div`
  ${RowFlex}
  height: 100%;
  padding: 40px 0;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  padding: 30px;
  /*100vh - 헤더높이 - 푸터높이 */
  height: calc(100vh - 70px - 20px);

  @media screen and (max-width: 1024px) {
    flex-wrap: wrap;
    width: 100%;
    padding: 0 30px;
    justify-content: center;
  }
`;

export const S_SearchContentBox = styled.section`
  width: 50%;
  height: 450px;
  position: relative;
  padding: 30px 0px;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
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

export const S_MainTitle = styled.h1`
  font-size: var(--font-size-xxxl);
  color: var(--color-primary-black);
  font-weight: 500;
  line-height: 1.2;

  @media screen and (max-width: 1450px) {
    font-size: 47px;
  }
`;

export const S_MainTextBox = styled.div`
  width: 100%;
  margin-top: 50px;
  position: absolute;
  opacity: ${({ textBoxActive }: { textBoxActive: boolean }) =>
    textBoxActive ? 1 : 0};
  transition: 1s;
`;
