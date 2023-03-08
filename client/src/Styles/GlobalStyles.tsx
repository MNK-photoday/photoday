import styled, { css, createGlobalStyle } from 'styled-components';
import Variables from './Variables';
import ResetCss from './ResetCss';

export const Flex = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Ex = styled.div`
  ${Flex}
  align-items: center;
`;

export const GlobalStyle = createGlobalStyle`
  ${ResetCss}
  ${Variables}
`;
