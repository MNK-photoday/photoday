import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  S_LoginContainerWrap,
  S_ImgContainer,
  S_ContentSection,
  S_LoginContainer,
  S_PasswordGuide,
  S_InvalidMessage,
} from '../Login/Login.styles';
import Button from '../../components/common/Button/Button';
import { EmailInput } from '../../components/Login/Input/Input';
import LoginLogo from '../../components/Login/LoginLogo/LoginLogo';
import { S_InputContainerWrap } from '../../components/Login/Input/Input.styles';
import { validateValue } from '../../components/Login/LoginValidationLogic/LoginValidationLogic';

function AccountRecovery() {
  const [inputValue, setInputValue] = useState('');
  const [validValue, setValidValue] = useState(true);
  const VALUE_TYPE = 'email';

  useEffect(() => {
    validateValue({ inputValue, setValidValue, VALUE_TYPE });
  }, [inputValue]);

  const changeEmailValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <S_LoginContainerWrap>
      <S_ImgContainer />
      <S_ContentSection>
        <S_LoginContainer>
          <LoginLogo />
          <S_InputContainerWrap>
            <EmailInput
              emailValue={inputValue}
              changeEventHandler={changeEmailValueHandler}
            />
          </S_InputContainerWrap>
          {!validValue && (
            <S_InvalidMessage isShowMessage={!validValue ? 'show' : 'hide'}>
              {`${inputValue} is not a valid email address.`}
            </S_InvalidMessage>
          )}
          <S_PasswordGuide>
            Forgot your account’s password? <br />
            Enter your email address and we’ll send you a recovery link.
          </S_PasswordGuide>
          <Link to="/login">
            <Button
              variant="point"
              shape="default"
              size="XXLarge"
              fullWidth
              disabled={!validValue}
            >
              Send recovery email
            </Button>
          </Link>
        </S_LoginContainer>
      </S_ContentSection>
    </S_LoginContainerWrap>
  );
}

export default AccountRecovery;
