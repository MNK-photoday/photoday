import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RowFlex } from '../../../styles/GlobalStyles';

export const S_HeaderModalWrap = styled.div`
  width: 150px;
  padding: 10px 20px;
  position: absolute;
  top: 45px;
  right: 0;
  z-index: 1;
  border-radius: 2px;
  background-color: var(--color-primary-gray10);
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;

  &::after {
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    border: 13px solid transparent;
    border-top-width: 0;
    border-bottom-color: var(--color-primary-gray10);
    top: -12px;
    right: 23px;
    z-index: -1;
  }
`;

export const S_ModalNavBox = styled.div`
  ${RowFlex}
  align-items: center;
  justify-content: flex-start;
  padding: 5px 0;

  &:hover {
    color: var(--color-primary-green);
    > a {
      color: var(--color-primary-green);
    }
  }

  .mypage-icon {
    font-size: 15px;
  }
  .logout-icon {
    font-size: 19px;
  }
`;

export const S_ModalNavLink = styled(Link)`
  font-size: var(--font-size-sm);
  color: var(--color-primary-black);
  padding: 5px 10px;
`;
