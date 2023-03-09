import styled from 'styled-components';
import { ColFlex } from '../../../styles/GlobalStyles';

export const FooterContainerWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const FooterContainerFlex = styled.div`
  ${ColFlex}
  width: 100%;
  max-width: 90vw;
  position: fixed;
  bottom: 0;
`;

export const FooterContent = styled.div`
  height: 20px;
  padding: 5px 0;
  background-color: green;
`;
