import styled from 'styled-components';
import { ColFlex } from '../../../styles/GlobalStyles';

export const HeaderContainerWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const HeaderContainerFlex = styled.div`
  width: 100%;
  max-width: 90vw;
`;

export const HeaderContent = styled.div`
  ${ColFlex}
  height: 60px;
  background-color: red;
`;
