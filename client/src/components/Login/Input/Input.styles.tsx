import styled, { css } from 'styled-components';

export const InputContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginInputLabel = styled.label`
  margin-bottom: 10px;
  font-size: var(--font-size-m);
  color: var(--color-primary-black);
`;

export const BorderCSS = css`
  border: var(--color-input-box-line);
  border-radius: 0.2rem;
  height: 40px;
`;

export const InputCSS = css`
  ${BorderCSS}
  height: 40px;
  padding-left: 15px;

  &:focus {
    box-shadow: inset 0 0 0 1px var(--color-primary-green);
  }
`;

export const EmailInput = styled.input`
  ${InputCSS}
  margin-bottom: 20px;
`;

export const PasswordInput = styled.input`
  ${InputCSS}
  margin-bottom: 3px;
`;

export const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 0.35rem;
  appearance: none;
  border: var(--color-input-box-line);
  accent-color: var(--color-primary-green);

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: var(--color-primary-green);
  }
`;

export const Label = styled.label`
  font-size: var(--font-size-sm);
  color: var(--color-primary-black);
`;

// export const Button = styled.button`
//   ${BorderCSS}
//   background: var(--white);
//   margin-bottom: 20px;

//   .icon {
//     margin-right: 10px;
//   }
// `;
