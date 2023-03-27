import styled from 'styled-components';
import { RowFlex } from '../../../styles/GlobalStyles';

export const S_FooterContainerWrap = styled.footer`
  ${RowFlex}
  justify-content: center;
  position: fixed;
  justify-content: flex-end;

  bottom: 0;
  right: 0;
`;

export const S_FooterSpan = styled.span`
  padding: 10px 50px;
  color: var(--color-primary-black);
  font-size: var(--font-size-sm);
`;
