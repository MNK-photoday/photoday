import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ColFlex, RowFlex } from '../../../styles/GlobalStyles';

export const S_HeaderContainerWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const S_HeaderContainerFlex = styled.div`
  width: 100%;
  max-width: 90vw;
`;

export const S_HeaderContent = styled.div`
  ${RowFlex}
  height: 70px;
  align-items: center;
  justify-content: space-between;
`;

export const S_LogoBox = styled.div`
  margin-right: 100px;
`;
export const S_Logo = styled.p`
  color: var(--color-primary-black);
  font-size: var(--font-size-xl);
`;

export const S_LogoPoint = styled.span`
  font-size: var(--font-size-xl);
  color: var(--color-primary-green);
`;
export const S_LinkBox = styled.div``;

export const S_HeaderLink = styled(Link)`
  color: var(--color-primary-black);
  font-size: var(--font-size-sm);
  margin-left: 30px;
  &:first-child {
    margin-left: 100px;
  }
`;
