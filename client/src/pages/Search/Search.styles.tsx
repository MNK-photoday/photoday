import styled from 'styled-components';

import { ColFlex, RowFlex } from '../../styles/GlobalStyles';
import { Container } from '../../styles/Layout';
export const S_SearchContainer = styled(Container)`
  width: 1300px;

  @media screen and (max-width: 1400px) {
    padding: 0px 50px;
  }
  @media screen and (max-width: 650px) {
    padding: 0px;
  }
`;

export const S_SearchBox = styled.section`
  ${ColFlex}
  align-items: center;
  padding: 40px 0px;
  width: 100%;
  margin: 0 auto;
`;

export const S_SearchMenuBox = styled.div`
  ${RowFlex}
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px;

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;
export const S_TagContentBox = styled.div`
  display: flex;
`;

export const S_SelectContentBox = styled.div`
  display: flex;
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

export const S_Tag = styled.span`
  background-color: #fff;
  display: inline-block;
  padding: 5px 15px;
  border-radius: 20px;
  border: 1px solid black;
  margin: 0 3px;
`;

export const S_ImageCardBox = styled.div`
  width: 100%;
`;
