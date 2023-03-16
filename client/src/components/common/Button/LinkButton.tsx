import React from 'react';
import { S_LinkButton } from './Button.style';

interface LinkButtonProps {
  variant: 'primary' | 'point';
  shape: 'default' | 'round';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  url: string;
}

function LinkButton({
  variant,
  shape,
  size,
  disabled = false,
  fullWidth = false,
  children,
  url,
}: LinkButtonProps) {
  return (
    <S_LinkButton
      variant={variant}
      shape={shape}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      to={url}
    >
      {children}
    </S_LinkButton>
  );
}

export default LinkButton;
