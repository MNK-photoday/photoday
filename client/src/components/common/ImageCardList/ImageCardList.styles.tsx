import styled from 'styled-components';

type ImageCardBoxProps = {
  width: number;
  height?: number;
  matrix: 'columns' | 'rows';
};

export const S_ImageCardWrap = styled.article`
  width: 100%;
`;

export const S_ImageCardBox = styled.div<ImageCardBoxProps>`
  width: 100%;
  display: grid;
  ${({ width, matrix }) =>
    width &&
    matrix &&
    `grid-template-${matrix}: repeat(auto-fill, minmax(${width}px, 1fr))`};
  row-gap: 10px;
  column-gap: 10px;
  ${({ height }) => height && `grid-auto-rows: ${height}px`};
`;

export const S_LoaderBar = styled.div`
  height: 20px;
  color: var(--color-primary-gray30);
  font-size: var(--font-size-m);
  text-align: center;
  padding: 10px 0;
`;
