import styled from 'styled-components';
import { ColFlex, RowFlex } from '../../../styles/GlobalStyles';
import { Container } from '../../../styles/Layout';

export const S_FooterContainerWrap = styled.footer`
  ${RowFlex}
  justify-content: center;
`;

export const S_FooterContainer = styled(Container)`
  position: fixed;
  bottom: 0;
  justify-content: flex-end;
  padding: 15px 0;
`;

export const S_FooterSpan = styled.span`
  color: var(--color-primary-black);
  font-size: var(--font-size-sm);
`;
