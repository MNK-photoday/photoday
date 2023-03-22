import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
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
import postPassword from '../../api/AccountRecovery';

function AccountRecovery() {
  const [inputValue, setInputValue] = useState('');
  const [validValue, setValidValue] = useState(true);
  const VALUE_TYPE = 'email';

  useEffect(() => {
    validateValue({ inputValue, setValidValue, VALUE_TYPE });
  }, [inputValue]);

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await postPassword(inputValue);
      alert(
        '입력하신 email로 임시 비밀번호을 성공적으로 발송하였습니다. 메일을 확인해 주세요.',
      );
      window.location.href = '/login';
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    }
  };

  const changeEmailValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <S_LoginContainerWrap>
      <S_ImgContainer />
      <S_ContentSection>
        <S_LoginContainer onSubmit={handleSendEmail}>
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
          <Button
            variant="point"
            shape="default"
            size="XXLarge"
            fullWidth
            disabled={!validValue}
          >
            Send recovery email
          </Button>
        </S_LoginContainer>
      </S_ContentSection>
    </S_LoginContainerWrap>
  );
}

export default AccountRecovery;
