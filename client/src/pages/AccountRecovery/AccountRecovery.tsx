import {
  S_LoginContainer,
  S_ImgContainer,
  S_ContentSection,
} from '../Login/Login.styles';
import AccountRecoverySection from '../../components/AccountRecovery/AccountRecoverySection';

function AccountRecovery() {
  return (
    <S_LoginContainer>
      <S_ImgContainer />
      <S_ContentSection>
        <AccountRecoverySection />
      </S_ContentSection>
    </S_LoginContainer>
  );
}

export default AccountRecovery;
