import styled from 'styled-components';
import { BorderCSS } from '../Input/Input.styles';

export const S_GoogleButton = styled.a`
  ${BorderCSS}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  font-size: var(--font-size-m);
  background-color: var(--white);
  color: var(--color-primary-black);

  &:hover {
    transform: translateY(-2px);
  }

  .google-icon {
    margin-right: 15px;
  }
`;
