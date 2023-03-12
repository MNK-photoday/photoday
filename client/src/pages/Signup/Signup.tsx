import { useState } from 'react';
import * as style from '../Login/Login.styles';
import { Input, CheckBox } from '../../components/Login/Input/Input';
import { Button } from '../../components/Login/GoogleBtn/Button.styles';
import { GoogleButton } from '../../components/Login/GoogleBtn/GoogleBtn';
import { TermsGuideContainer } from './Signup.styles';
import LinkText from '../../components/Login/LinkText/LinkText';
import LoginLogo from '../../components/Login/LoginLogo/LoginLogo';
// import TermsModal from '../../components/TermsModal/TermsModal';

function Signup() {
  const [isChecked, setIsChecked] = useState(false);

  const handleonChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <style.LoginContainerWrap>
      <style.ImgContainer />
      <style.ContentSection>
        <style.LoginContainer>
          <LoginLogo />
          <Input />
          <style.PasswordGuide>
            Passwords must contain at least eight characters,
            <br /> including at least 1 letter and 1 number.
          </style.PasswordGuide>
          <style.CheckBoxContainer>
            <CheckBox
              text="Check Terms and Conditions"
              handleonChecked={handleonChecked}
            />
          </style.CheckBoxContainer>
          <TermsGuideContainer>
            {/* <TermsModal /> 구현하기... */}
          </TermsGuideContainer>
          <GoogleButton text="Sign up with Google" />
          <Button isGreen={true}>Sign up</Button>
          <LinkText text="Already have an account?" linkTo="Log in" />
        </style.LoginContainer>
      </style.ContentSection>
    </style.LoginContainerWrap>
  );
}

export default Signup;
