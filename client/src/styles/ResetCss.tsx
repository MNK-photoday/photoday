import { css } from 'styled-components';

// @charset "utf-8";

const ResetCss = css`
  * {
    margin: 0;
    padding: 0;
    font-family: 'NotoSans', 'NotoSans-KR', 'sans-serif';
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

  body {
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: var(--color-primary-gray30);
    }
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

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default ResetCss;
