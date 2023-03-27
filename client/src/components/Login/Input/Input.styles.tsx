import styled, { css } from 'styled-components';

export const BorderCSS = css`
  border: var(--color-input-box-line);
  border-radius: 0.2rem;
  height: 40px;
`;

export const S_InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const S_InputLabel = styled.label`
  margin-bottom: 10px;
  font-size: var(--font-size-m);
  color: var(--color-primary-black);
`;

export const S_Input = styled.input`
  ${BorderCSS}
  height: 40px;
  width: 335px;
  padding-left: 15px;
  margin-bottom: 15px;
  &:focus {
    box-shadow: inset 0 0 0 1px var(--color-primary-green);
  }

  @media screen and (max-width: 414px) {
    width: 100%;
  }
`;

export const S_CheckBox = styled.input<{ isChecked: boolean }>`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 0.35rem;
  appearance: none;
  border: var(--color-input-box-line);
  accent-color: var(--color-primary-green);

  background-image: ${({ isChecked }) =>
    isChecked
      ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e")`
      : undefined};
  background-color: ${({ isChecked }) =>
    isChecked && 'var(--color-primary-green)'};

  @media screen and (max-width: 1024px) {
    border: 1px solid var(--color-primary-green);
  }
`;

export const S_Label = styled.label`
  font-size: var(--font-size-sm);
  color: var(--color-primary-black);
`;
