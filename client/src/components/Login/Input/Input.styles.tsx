import styled, { css } from 'styled-components';

export const InputContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginInputLabel = styled.label`
  font-size: var(--font-size-m);
  margin-bottom: 10px;
`;

export const BorderCSS = css`
  border: var(--color-input-box-line);
  border-radius: 3px;
  height: 40px;
`;

export const InputCSS = css`
  ${BorderCSS}
  /* border: var(--color-input-box-line);
  border-radius: 3px; */
  height: 40px;
`;

export const EmailInput = styled.input`
  ${InputCSS}
  margin-bottom: 20px;
`;

export const passwordInput = styled.input`
  ${InputCSS}
  margin-bottom: 3px;
`;

export const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  appearance: none;
  /* border: 1px solid #ff0000; // 왜 안 먹어?... */
  border: var(--color-input-box-line);

  accent-color: var(--color-primary-green);
`;

export const Label = styled.label`
  font-size: var(--font-size-sm);
`;

export const Button = styled.button`
  ${BorderCSS}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: var(--white);
  margin-bottom: 20px;

  .icon {
    margin-right: 10px;
  }
`;
