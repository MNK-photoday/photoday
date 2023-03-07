import { createGlobalStyle } from 'styled-components';
import Variables from './Variables';
import ResetCss from './ResetCss';

const GlobalStyle = createGlobalStyle`
  ${ResetCss}
  ${Variables}
`;

export default GlobalStyle;
