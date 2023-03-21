import styled from 'styled-components';
import { ImageCardListProps } from './ImageCardList';

export const S_ImageCardBox = styled.div<ImageCardListProps>`
  width: 100%;
  display: grid;
  ${({ width, matrix }) =>
    width &&
    matrix &&
    `grid-template-${matrix}: repeat(auto-fill, minmax(${width}px, 1fr))`};
  gap: 5px;
`;
