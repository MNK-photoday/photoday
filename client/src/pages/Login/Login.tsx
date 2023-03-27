import {
  S_ImgContainer,
  S_ContentSection,
  S_LoginContainer,
} from './Login.styles';
import LoginSection from '../../components/Login/LoginSection/LoginSection';

function Login() {
  return (
    <S_LoginContainer>
      <S_ImgContainer />
      <S_ContentSection>
        <LoginSection />
      </S_ContentSection>
    </S_LoginContainer>
  );
}

export default Login;
