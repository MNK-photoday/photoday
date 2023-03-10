import styled from 'styled-components';
import { ColFlex } from '../../../styles/GlobalStyles';

export const FooterContainerWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const FooterContainerFlex = styled.div`
  ${ColFlex}
  width: 100%;
  max-width: 95vw;
  position: fixed;
  bottom: 0;
`;

export const FooterContent = styled.div`
  height: 30px;
  padding: 10px 0;
  text-align: end;
`;

export const FooterSpan = styled.span`
  color: var(--color-primary-black);
  font-size: var(--font-size-sm);
`;
