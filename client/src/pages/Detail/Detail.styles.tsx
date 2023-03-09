import styled from 'styled-components';
import { RowFlex, ColFlex } from '../../styles/GlobalStyles';

export const DetailBox = styled.div`
  ${ColFlex}
  align-items: center;
  justify-content: flex-start;

  padding-top: 40px;

  background-color: skyblue;

  height: auto;
`;

export const PicBox = styled.div`
  ${ColFlex}
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: auto;
  background-color: aliceblue;
`;

export const ContentsTop = styled.div`
  ${RowFlex}
  width: 100%;
  justify-content: space-between;
`;
export const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 85%;
  height: auto;

  > img {
    width: 100%;
    height: auto;
  }
`;
export const ContentsBottom = styled.div`
  ${RowFlex}
  width: 100%;
  justify-content: space-between;
`;

export const TagBox = styled.div`
  ${RowFlex}
  width: 85%;
  height: auto;

  background-color: #ccc;
`;

export const SeachList = styled.div`
  width: 85%;
  height: 1000px;
`;
