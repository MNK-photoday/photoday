import styled, { css } from 'styled-components';

interface ButtonProps {
  variant: 'primary' | 'point';
  shape: 'default' | 'round';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  disabled: boolean;
  children: React.ReactNode;
}
const variantCSS = {
  point: css`
    background-color: var(--color-primary-green);
    color: var(--white);
    border-radius: var(--box-radius-3);

    &:disabled {
      background-color: var(--color-primary-gray30);
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
    padding: 10px 105px;
    font-size: var(--font-size-m);
  `,
};

export const S_ButtonBox = styled.button<ButtonProps>`
  ${({ variant }) => variantCSS[variant]}
  ${({ size }) => sizeCSS[size]}
  ${({ shape }) => shapeCSS[shape]}
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  border: none;
  transition: all 0.3s ease 0s;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
`;
