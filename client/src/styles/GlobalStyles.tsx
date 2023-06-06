import { css, createGlobalStyle } from 'styled-components';
import Variables from './Variables';
import ResetCss from './ResetCss';

import NotoSansBold from '../assets/fonts/NotoSansKR-Bold.otf';
import NotoSansMedium from '../assets/fonts/NotoSansKR-Medium.otf';
import NotoSansRegular from '../assets/fonts/NotoSansKR-Regular.otf';

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
  ${ResetCss};
  ${Variables};


  @font-face {
    font-family: 'NotoSansBold';
    src: url(${NotoSansBold}) format('opentype');
  }

  @font-face {
    font-family: 'NotoSansMedium';
    src: url(${NotoSansMedium}) format('opentype');
  }

  @font-face {
    font-family: 'NotoSansRegular';
    src: url(${NotoSansRegular}) format('opentype');
  }
  
  html, body, a, button, input {
    font-family: 'NotoSansRegular';
  }
`;
