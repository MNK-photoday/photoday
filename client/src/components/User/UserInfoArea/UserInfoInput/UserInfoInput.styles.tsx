import styled, { css } from 'styled-components';

const BorderCss = css`
  border-radius: var(--box-radius-3);
  border: 1px solid var(--color-primary-gray30);

  &:focus {
    outline: 2px solid var(--color-primary-green);
  }
`;

export const S_UserInfoTextarea = styled.textarea`
  ${BorderCss}
  width: 80%;
  height: 110px;
  padding: 10px;
  resize: none;
`;

export const S_SetPasswordInputLabel = styled.label`
  font-size: var(--font-size-sm);
  color: var(--color-primary-black);
  margin: 20px 0 8px;
`;

export const S_SetPasswordInput = styled.input`
  ${BorderCss}
  width: 300px;
  height: 35px;
  padding-left: 8px;
`;
