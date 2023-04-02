import styled from 'styled-components';
import { ColFlex } from '../../../styles/GlobalStyles';

export const S_SelectModalWrap = styled.div`
  position: absolute;
  min-width: 150px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(14, 19, 24, 0.07),
    0 2px 18px rgba(14, 19, 24, 0.25);
  z-index: 90;
  background-color: var(--white);
  top: 40px;
  right: 0;
`;
export const S_SelectModalContainer = styled.div`
  ${ColFlex}
  padding: 15px 12px;
  cursor: pointer;
  border-radius: 5px;
  text-align: start;
`;
export const S_SelectModalSpan = styled.span<{ active: boolean }>`
  padding: 7px 5px;
  font-size: var(--color-primary-black);
  font-size: var(--font-size-sm);
  border-radius: 5px;
  color: ${({ active }) =>
    active ? 'var(--color-primary-green)' : 'var(--color-primary-black)'};

  &:hover {
    background-color: #f7f7f7;
  }
`;
