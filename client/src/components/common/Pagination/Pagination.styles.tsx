import styled from 'styled-components';
import { Flex } from '../../../styles/GlobalStyles';

export const S_PaginationContainer = styled.div`
  ${Flex}
  margin: 20px;
`;

export const S_PageButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 0 8px;
  background-color: transparent;

  &:hover {
    color: var(--white);
    background-color: #67cd92;
  }
`;

export const S_ButtonNav = styled(S_PageButton)<{ isCurrentPage: boolean }>`
  background-color: ${({ isCurrentPage }) =>
    isCurrentPage ? 'var(--color-primary-green)' : 'var(--white)'};

  color: ${({ isCurrentPage }) =>
    isCurrentPage ? 'var(--white)' : 'var(--color-primary-green)'};
`;
