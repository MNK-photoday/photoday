import { css } from 'styled-components';

// @charset "utf-8";

const ResetCss = css`
  * {
    margin: 0;
    padding: 0;
    font-family: 'NotoSans', 'NotoSans-KR', 'sans-serif';
    //-ms-overflow-style: none; /* 인터넷 익스플로러 */
    //scrollbar-width: none; /* 파이어폭스 */
  }

  /* *::-webkit-scrollbar {
    display: none;
  } */

  @font-face {
    font-family: 'NotoSans';
    font-weight: 400;
    src: url('../assets/fonts/NotoSans-Regular.ttf') format('truetype');
    unicode-range: U+0041-005A, U+0061-007A;
  }
  @font-face {
    font-family: 'NotoSans';
    font-weight: 500;
    src: url('../assets/fonts/NotoSans-Medium.ttf') format('truetype');
    unicode-range: U+0041-005A, U+0061-007A;
  }

  @font-face {
    font-family: 'NotoSans';
    font-weight: 700;
    src: url('../assets/fonts/NotoSans-Bold.ttf') format('truetype');
    unicode-range: U+0041-005A, U+0061-007A;
  }
  @font-face {
    font-family: 'NotoSans-KR';
    font-weight: 400;
    src: url('../assets/fonts/NotoSansKR-Regular.otf') format('opentype');
    unicode-range: U+AC00-D7A3;
  }
  @font-face {
    font-family: 'NotoSans-KR';
    font-weight: 500;
    src: url('../assets/fonts/NotoSansKR-Medium.otf') format('opentype');
    unicode-range: U+AC00-D7A3;
  }
  @font-face {
    font-family: 'NotoSans-KR';
    font-weight: 700;
    src: url('../assets/fonts/NotoSansKR-Bold.otf') format('opentype');
    unicode-range: U+AC00-D7A3;
  }

  html,
  body,
  div,
  span,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  abbr,
  address,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  samp,
  small,
  strong,
  sub,
  sup,
  var,
  b,
  i,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    width: 100%;

    height: 100%;
  }

  html {
    overflow-y: scroll;
    overflow-x: hidden;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
  }

  body,
  input,
  textarea {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }

  img {
    vertical-align: top;
    font-size: 0;
    border: 0;
  }
  table {
    border-collapse: collapse;
  }
  input,
  select {
    vertical-align: middle;
  }

  .clear:after {
    content: '';
    display: block;
    clear: both;
  }

  .indent {
    display: block;
    text-indent: -9999px;
  }

  .hidden {
    display: none;
  }

  input {
    border: none;
    outline: none;
  }
`;

export default ResetCss;
