import React, { Children } from 'react';
import { S_ButtonBox } from './Button.style';

interface ButtonProps {
  variant: 'primary' | 'point';
  shape: 'default' | 'round';
  size: 'small' | 'medium' | 'large' | 'XLarge' | 'XXLarge';
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  buttonClickEvent?: () => void;
}

function Button({
  variant,
  shape,
  size,
  disabled = false,
  fullWidth = false,
  buttonClickEvent,
  children,
}: ButtonProps) {
  return (
    <S_ButtonBox
      variant={variant}
      shape={shape}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={buttonClickEvent}
    >
      {children}
    </S_ButtonBox>
  );
}

export default Button;
