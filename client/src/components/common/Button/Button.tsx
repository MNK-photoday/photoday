import React, { Children } from 'react';
import * as style from './Button.style';

interface ButtonProps {
  variant: 'primary' | 'point';
  shape: 'default' | 'round';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

function Button({
  variant,
  shape,
  size,
  disabled = false,
  fullWidth = false,
  children,
}: ButtonProps) {
  return (
    <style.ButtonBox
      variant={variant}
      shape={shape}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {children}
    </style.ButtonBox>
  );
}

export default Button;
