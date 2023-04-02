import styled from 'styled-components';
import { RowFlex } from '../../../styles/GlobalStyles';

export const S_SelectBoxWrap = styled.button`
  padding: 7px 15px;
  border-radius: 20px;
  border: var(--color-tag-line);
  background-color: var(--white);
  position: relative;
  cursor: pointer;
  transition: 0.5s;
  ${RowFlex}
  align-items: center;
  height: 35px;
  &:hover {
    border: 1px solid var(--color-primary-black);
  }
  .selectbox-icons {
    color: var(--color-primary-black);
  }
`;
export const S_SelectSpan = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-primary-black);
`;
