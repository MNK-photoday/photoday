import {
  S_LoginContainerWrap,
  S_ImgContainer,
  S_ContentSection,
  S_LoginContainer,
  S_PasswordGuide,
  S_InvalidMessage,
} from '../Login/Login.styles';
import { S_InputContainerWrap } from '../../components/Login/Input/Input.styles';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../../components/common/Button/Button';
import { EmailInput } from '../../components/Login/Input/Input';
import LoginLogo from '../../components/Login/LoginLogo/LoginLogo';
import { validateEmail } from '../../components/Login/LoginValidationLogic/LoginValidationLogic';

function AccountRecovery() {
  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);

  useEffect(() => {
    const emailIdentifier = setTimeout(() => {
      if (emailValue) {
        setEmailValid((state) => {
          return (state = validateEmail(emailValue));
        });
      }
    }, 500);

    // 작성 후, 다 지웠을 때 변화를 위해서 추가
    if (!emailValue) {
      setEmailValid((state) => {
        return (state = true);
      });
    }

    return () => {
      clearTimeout(emailIdentifier);
    };
  }, [emailValue]);

  const changeEmailValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setEmailValue(value);
  };

  console.log(isEmailValid);

  return (
    <S_LoginContainerWrap>
      <S_ImgContainer />
      <S_ContentSection>
        <S_LoginContainer>
          <LoginLogo />
          <S_InputContainerWrap>
            <EmailInput
              emailValue={emailValue}
              changeEventHandler={changeEmailValueHandler}
            />
          </S_InputContainerWrap>
          {!isEmailValid && (
            <S_InvalidMessage isShowMessage={!isEmailValid ? 'show' : 'hide'}>
              {`${emailValue} is not a valid email address.`}
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
              size="large"
              fullWidth
              disabled={!isEmailValid}
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
