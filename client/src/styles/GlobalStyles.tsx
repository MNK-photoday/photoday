import { css, createGlobalStyle } from 'styled-components';
import Variables from './Variables';
import ResetCss from './ResetCss';

import NotoSansKrBold from '../assets/fonts/NotoSansKR-Bold.otf';
import NotoSansKrMedium from '../assets/fonts/NotoSansKR-Medium.otf';
import NotoSansKrRegular from '../assets/fonts/NotoSansKR-Regular.otf';
import OpenSansRegular from '../assets/fonts/OpenSans-Regular.ttf';
import NotoSerifRegular from '../assets/fonts/NotoSerif-Regular.ttf';

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
    font-family: 'NotoSansKrBold';
    src: url(${NotoSansKrBold}) format('opentype');
  }

  @font-face {
    font-family: 'NotoSansKrMedium';
    src: url(${NotoSansKrMedium}) format('opentype');
  }

  // 숫자
  @font-face {
    font-family: 'OpenSansRegular';
    src: url(${OpenSansRegular}) format('truetype');
    unicode-range: U+0030-0039;
  }

  // 영문 대문자, 소문자
  @font-face {
    font-family: 'NotoSerifRegular';
    src: url(${NotoSerifRegular}) format('truetype');
    unicode-range: U+0041-005A, U+0061-007A;
  }


  // 한글
  @font-face {
    font-family: 'NotoSansKrRegular';
    src: url(${NotoSansKrRegular}) format('opentype');
    unicode-range: U+AC00-D7A3;
  }
  
  html, body, a, p, h1, h2, h3, h4, h5, h6, span, div, button, input {
    font-family: 'NotoSansKrRegular', 'NotoSerifRegular', 'OpenSansRegular';
  }
`;
