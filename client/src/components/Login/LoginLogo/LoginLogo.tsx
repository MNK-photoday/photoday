import {
  S_LoginLogoContainer,
  S_LoginLogo,
  S_LoginLogoPoint,
} from './LoginLogo.styles';

function LoginLogo() {
  return (
    <S_LoginLogoContainer>
      <S_LoginLogo to="/">
        pho<S_LoginLogoPoint>to</S_LoginLogoPoint>day
      </S_LoginLogo>
    </S_LoginLogoContainer>
  );
}

export default LoginLogo;
