import styled from 'styled-components';
import { ColFlex } from '../../styles/GlobalStyles';

export const S_DetailModalContainer = styled.div`
  ${ColFlex}
  width: 80px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid var(--color-primary-gray20);
  background-color: #fff;
  position: absolute;
  top: 165px;
`;

export const S_ModalReportButton = styled.button``;
export const S_ModalDeleteButton = styled.button`
  margin-top: 5px;
`;
