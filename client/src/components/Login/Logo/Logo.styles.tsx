import styled from 'styled-components';
import { RowFlex } from '../../../styles/GlobalStyles';

export const LoginLogoContainer = styled.div`
  ${RowFlex}
  align-items: center;
  height: 200px;
`;

// 정호 merge 후, 불러오기
export const Logo = styled.p`
  align-items: center;
  font-size: var(--font-size-xxl);
`;

export const LogoPoint = styled.span`
  color: var(--color-primary-green);
`;
