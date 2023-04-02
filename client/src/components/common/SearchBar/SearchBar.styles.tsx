import styled, { keyframes, css } from 'styled-components';

export const S_SearchBarWrap = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
  height: ${({ active }) => (active ? '30px' : '35px')};
  margin-bottom: ${({ active }) => (active ? '0px' : '20px')};

  .search-icon {
    font-size: 15px;
    position: absolute;
    left: 15px;
    z-index: 10;
  }

  @media screen and (max-width: 650px) {
    display: ${({ active }) => (active ? 'none' : 'flex')};
  }
`;

const vibrationKeyframe = keyframes`
  from {
    transform: translateY(-2px);
  }
  to {
    transform: translateY(2px);

  }
`;

const vibratAnimation = css`
  animation: ${vibrationKeyframe} 0.1s;
`;

export const S_SearchBarInput = styled.input<{ isInputNull: boolean }>`
  border-radius: 25px;
  background-color: var(--color-primary-gray10);
  height: 100%;
  width: 100%;
  padding: 3px 40px;
  border: none;
  outline: none;
  font-size: var(--font-size-m);
  color: var(--color-primary-black);
  ${({ isInputNull }) => isInputNull && vibratAnimation};
`;
