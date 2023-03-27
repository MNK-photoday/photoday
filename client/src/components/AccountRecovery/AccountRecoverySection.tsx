import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import {
  S_FormContainer,
  S_InvalidMessage,
} from '../Login/LoginSection/LoginSection.styles';
import { S_InputContainer } from '../Login/Input/Input.styles';
import { S_PasswordGuide } from '../Signup/SignupSection/SignupSection.styles';
import Button from '../common/Button/Button';
import LoginLogo from '../Login/LoginLogo/LoginLogo';
import postPassword from '../../api/AccountRecovery';
import { EmailInput } from '../Login/Input/Input';
import { validateValue } from '../Login/LoginValidationLogic/LoginValidationLogic';

function AccountRecoverySection() {
  const [inputValue, setInputValue] = useState('');
  const [validValue, setValidValue] = useState(true);
  const VALUE_TYPE = 'email';

  useEffect(() => {
    validateValue({ inputValue, setValidValue, VALUE_TYPE });
  }, [inputValue]);

  const sendEmailHandler = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <S_FormContainer onSubmit={sendEmailHandler}>
      <LoginLogo />
      <S_InputContainer>
        <EmailInput
          emailValue={inputValue}
          changeEventHandler={changeEmailValueHandler}
        />
      </S_InputContainer>
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
    </S_FormContainer>
  );
}

export default AccountRecoverySection;
