import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface ButtonStyleProps {
  variant: 'primary' | 'point';
  shape: 'default' | 'round';
  size: 'small' | 'medium' | 'large' | 'XLarge' | 'XXLarge';
  fullWidth: boolean;
  disabled: boolean;
}
const variantCSS = {
  point: css`
    background-color: var(--color-primary-green);
    color: var(--white);
    border-radius: var(--box-radius-3);

    &:disabled {
      background-color: var(--color-primary-gray30);
      pointer-events: none;
    }
    &:hover {
      transform: translateY(-2px);
    }
  `,

  primary: css`
    background-color: var(--color-primary-gray30);
    color: var(--color-primary-black);

    &:disabled {
      background-color: var(--color-primary-gray30);
    }

    &:hover {
      transform: translateY(-2px);
    }
  `,
};

const shapeCSS = {
  default: css`
    border-radius: var(--box-radius-3);
  `,
  round: css`
    border-radius: var(--box-radius-10);
  `,
};

const sizeCSS = {
  small: css`
    padding: 6px 15px;
  `,
  medium: css`
    padding: 8px 60px;
    font-size: var(--font-size-sm);
  `,
  large: css`
    padding: 10px 22px;
    font-size: var(--font-size-sm);
    margin: 15px 0;
  `,
  XLarge: css`
    padding: 10px 20px;
    font-size: var(--font-size-sm);
    background-color: var(--color-primary-gray30);
  `,
  XXLarge: css`
    padding: 10px;
    font-size: var(--font-size-m);
  `,
};

export const S_LinkButton = styled(Link)<ButtonStyleProps>`
  ${({ variant }) => variantCSS[variant]}
  ${({ size }) => sizeCSS[size]}
  ${({ shape }) => shapeCSS[shape]}
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  border: none;
  transition: all 0.3s ease 0s;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
`;

export const S_Button = styled.button<ButtonStyleProps>`
  ${({ variant }) => variantCSS[variant]}
  ${({ size }) => sizeCSS[size]}
  ${({ shape }) => shapeCSS[shape]}
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  border: none;
  transition: all 0.3s ease 0s;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
`;
