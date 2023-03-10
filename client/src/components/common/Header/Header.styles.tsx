import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ColFlex, RowFlex } from '../../../styles/GlobalStyles';

export const HeaderContainerWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const HeaderContainerFlex = styled.div`
  width: 100%;
  max-width: 90vw;
`;

export const HeaderContent = styled.div`
  ${RowFlex}
  height: 70px;
  align-items: center;
  justify-content: space-between;
`;

export const LogoBox = styled.div`
  margin-right: 100px;
`;
export const Logo = styled.p`
  font-size: var(--font-size-xl);
`;

export const LogoPoint = styled.span`
  font-size: var(--font-size-xl);
  color: var(--color-primary-green);
`;
export const LinkBox = styled.div``;
export const HeaderLink = styled(Link)`
  font-size: var(--font-size-sm);
  margin-left: 30px;
  &:first-child {
    margin-left: 100px;
  }
`;
