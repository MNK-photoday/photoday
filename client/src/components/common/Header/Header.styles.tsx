import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RowFlex } from '../../../styles/GlobalStyles';

export const S_HeaderContainerWrap = styled.header`
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
  height: 43px;
`;
export const S_LogoH1 = styled.h1`
  font-weight: normal;
  color: var(--color-primary-black);
  font-size: 27px;
`;
export const S_LogoPoint = styled.span`
  font-size: 27px;
  color: var(--color-primary-green);
`;
export const S_NavBox = styled.nav`
  ${RowFlex}
  align-items: center;
  height: 100%;

  .addImage-icon {
    color: var(--color-primary-green);
    font-size: 30px;
    margin-top: 3px;
  }
`;
export const S_NavLink = styled(Link)`
  color: var(--color-primary-black);
  font-size: var(--font-size-sm);
  margin-left: 30px;
  &:first-child {
    margin-left: 100px;
  }
`;
export const S_NavSpan = styled.div`
  color: var(--color-primary-black);
  font-size: var(--font-size-sm);
  margin-left: 30px;
  cursor: pointer;
`;
export const S_NavLinkIconBox = styled.div`
  ${RowFlex}
  align-items: center;
  position: relative;

  &:hover {
    .triangleDown-icon {
      color: var(--color-primary-black);
    }
  }
  .user-icon {
    font-size: 26px;
    color: var(--color-primary-black);
  }
  .triangleDown-icon {
    font-size: 20px;
    color: #868383;
    transition: all 0.125s ease-in 0s;
  }
`;
