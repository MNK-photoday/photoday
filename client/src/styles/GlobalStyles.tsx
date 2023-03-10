import styled, { css, createGlobalStyle } from 'styled-components';
import Variables from './Variables';
import ResetCss from './ResetCss';

export const Flex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RowFlex = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ColFlex = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const GlobalStyle = createGlobalStyle`
  ${ResetCss}
  ${Variables}
`;
