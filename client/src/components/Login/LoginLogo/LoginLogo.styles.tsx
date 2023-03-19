import styled from 'styled-components';
import { RowFlex } from '../../../styles/GlobalStyles';
import { Link } from 'react-router-dom';

export const S_LoginLogoContainer = styled.div`
  ${RowFlex}
  align-items: center;
  height: 25%;
`;

export const S_LoginLogo = styled(Link)`
  font-size: var(--font-size-xxl);
`;

export const S_LoginLogoPoint = styled.span`
  color: var(--color-primary-green);
`;
