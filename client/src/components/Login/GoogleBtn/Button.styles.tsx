import styled from 'styled-components';
import { BorderCSS } from '../Input/Input.styles';

export const Button = styled.button<{ isGreen: boolean }>`
  ${BorderCSS}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  font-size: var(--font-size-m);

  background: ${({ isGreen }) =>
    isGreen ? `var(--color-primary-green)` : `var(--white)`};

  color: ${({ isGreen }) =>
    isGreen ? `var(--white)` : `var(--color-primary-black)`};

  .google-icon {
    margin-right: 15px;
  }

  &:hover {
    box-shadow: ${({ isGreen }) =>
      isGreen
        ? `0 80px 0 0 hsl(140,40%,47%) inset`
        : `0 80px 0 0 hsl(210,8%,97.5%) inset`};
  }
`;
