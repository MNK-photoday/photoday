import React from 'react';
import { S_GoogleButtonCSS } from './GoogleButton.styles';
import { FcGoogle } from 'react-icons/fc';

interface IProps {
  children: React.ReactNode;
}

function GoogleButton({ children }: IProps) {
  return (
    <S_GoogleButtonCSS>
      <FcGoogle className="google-icon" size={20} />
      {children}
    </S_GoogleButtonCSS>
  );
}

export default GoogleButton;
