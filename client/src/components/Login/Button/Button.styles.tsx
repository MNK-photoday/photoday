import styled, { css } from 'styled-components';
import { BorderCSS } from '../Input/Input.styles';

export const Button = styled.button`
  ${BorderCSS}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: var(--white);
  margin-bottom: 20px;

  .icon {
    margin-right: 10px;
  }
`;
