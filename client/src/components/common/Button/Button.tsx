import React from 'react';
import { S_Button } from './Button.style';

interface ButtonProps {
  variant: 'primary' | 'point';
  shape: 'default' | 'round';
  size: 'small' | 'medium' | 'large' | 'XLarge' | 'XXLarge';
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  clickEventHandler?: () => void;
}

function Button({
  variant,
  shape,
  size,
  disabled = false,
  fullWidth = false,
  clickEventHandler,
  children,
}: ButtonProps) {
  return (
    <S_Button
      variant={variant}
      shape={shape}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={clickEventHandler}
    >
      {children}
    </S_Button>
  );
}

export default Button;
