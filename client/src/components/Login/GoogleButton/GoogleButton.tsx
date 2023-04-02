import React from 'react';
import { S_GoogleButton } from './GoogleButton.styles';
import { FcGoogle } from 'react-icons/fc';

type Children = {
  children: React.ReactNode;
};

function GoogleButton({ children }: Children) {
  return (
    <S_GoogleButton type="a" href={import.meta.env.VITE_GOOGLE_AUTH_URL}>
      <FcGoogle className="google-icon" size={20} />
      {children}
    </S_GoogleButton>
  );
}

export default GoogleButton;
