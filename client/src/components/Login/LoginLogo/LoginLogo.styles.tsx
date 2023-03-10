import styled from 'styled-components';
import { RowFlex } from '../../../styles/GlobalStyles';

export const LoginLogoContainer = styled.div`
  ${RowFlex}
  align-items: center;
  height: 25%;
`;

export const LoginLogo = styled.p`
  font-size: var(--font-size-xxl);
`;

export const LoginLogoPoint = styled.span`
  color: var(--color-primary-green);
`;
