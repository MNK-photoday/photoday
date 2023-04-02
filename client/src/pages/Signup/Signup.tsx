import {
  S_ImgContainer,
  S_ContentSection,
  S_LoginContainer,
} from '../Login/Login.styles';
import SignupSection from '../../components/Signup/SignupSection/SignupSection';

function Signup() {
  return (
    <S_LoginContainer>
      <S_ImgContainer />
      <S_ContentSection>
        <SignupSection />
      </S_ContentSection>
    </S_LoginContainer>
  );
}

export default Signup;
