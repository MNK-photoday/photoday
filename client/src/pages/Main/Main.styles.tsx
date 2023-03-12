import styled from 'styled-components';
import { ColFlex, RowFlex } from '../../styles/GlobalStyles';

export const MainContentBox = styled.div`
  ${RowFlex}
  height: 100%;
  /* background-color: blue; */
  padding: 40px 0;
  box-sizing: border-box;
  height: calc(100vh - 60px - 30px);
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const MainContent = styled.div`
  /* background-color: red; */
  width: 47%;
  ${RowFlex};
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  &:first-child {
    margin-left: 45px;
  }
`;

export const MainImgBox = styled.div`
  display: flex;
  /* background-color: yellow; */
  width: 85%;
  height: 48%;
  position: relative;
`;

export const MainImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const SearchContentBox = styled.div`
  /* background-color: blue; */
  width: 100%;
  height: 50%;
`;

export const SearchImgBox = styled.div`
  margin-top: 20px;
  /* background-color: yellow; */
  width: 100%;
  height: 100%;
  position: relative;
`;

export const MainTextBox = styled.div`
  /* background-color: saddlebrown; */
  width: 50%;
  bottom: 350px;
  position: absolute;
`;
export const MainTextSpan = styled.span`
  font-size: 50px;
  color: var(--color-primary-black);
  font-weight: 500;
  line-height: 1.2;
`;
