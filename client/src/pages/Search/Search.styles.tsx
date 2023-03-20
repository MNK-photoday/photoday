import styled from 'styled-components';

import { ColFlex, RowFlex } from '../../styles/GlobalStyles';
import { Container } from '../../styles/Layout';
export const S_SearchContainer = styled(Container)`
  padding: 0px 220px;
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
`;
export const S_TagContentBox = styled.div`
  display: inline-block;
  margin: 0 10px;
`;

export const S_SelectContentBox = styled.div``;

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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 5px;
`;
