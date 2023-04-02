import styled from 'styled-components';
import { ColFlex } from '../../../styles/GlobalStyles';

export const S_TermsGuideModal = styled.div`
  position: fixed;
  top: 22%;
  width: 310px;
  height: 445px;
  border-radius: 0.3rem;
  background-color: var(--white);
  border: 1px solid var(--color-primary-green);
  padding: 20px;
  font-size: 15px;
  color: var(--color-primary-black);
`;

export const S_Ul = styled.ul`
  ${ColFlex}
  margin: 20px 0;
  color: var(--color-primary-green);
  font-weight: bold;
`;

export const S_Li = styled.li`
  margin: 10px 0 5px 20px;
  color: var(--color-primary-black);
  font-weight: normal;
  list-style: disc;

  &::marker {
    color: var(--color-primary-green);
    font-size: 0.5rem;
  }
`;
