import styled from 'styled-components';
import { RowFlex, ColFlex } from '../../styles/GlobalStyles';

export const UploadBox = styled.div`
  ${ColFlex}
  align-items: center;

  padding-top: 40px;
`;

export const UploadTitle = styled.div`
  ${RowFlex}
  align-items: center;

  font-size: 2.5rem;
  font-weight: 500;

  width: 100%;
  height: 100px;
`;
export const FileBox = styled.div`
  width: 930px;
  height: 500px;

  color: #ccc;
  font-size: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 3px dotted #ccc;
`;

export const UploadBottom = styled.div`
  ${RowFlex}
  justify-content: space-between;

  padding-top: 40px;

  width: 930px;
`;
