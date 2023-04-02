import styled from 'styled-components';

type ImageCardBoxProps = {
  height?: number;
  matrix: 'columns' | 'rows';
};

export const S_ImageCardWrap = styled.article<ImageCardBoxProps>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 10px;
  column-gap: 10px;

  ${({ height }) => height && `grid-auto-rows: ${height}px`};

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 350px;
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
export const S_SkeletonImageCardWrap = styled.article<ImageCardBoxProps>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 10px;
  column-gap: 10px;
  ${({ height }) => height && `grid-auto-rows: ${height}px`};

  @media screen and (max-width: 1500px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 1020px) {
    grid-template-columns: 1fr;
  }
`;

export const S_LoaderBar = styled.div`
  height: 20px;
  color: var(--color-primary-gray30);
  font-size: var(--font-size-m);
  text-align: center;
  padding: 10px 0;
`;
