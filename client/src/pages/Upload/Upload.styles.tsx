import styled from 'styled-components';
import { RowFlex, ColFlex, Flex } from '../../styles/GlobalStyles';

export const S_UploadBox = styled.div`
  ${ColFlex}
  align-items: center;

  padding: 40px 0;
`;

export const S_UploadTitle = styled.div`
  ${RowFlex}
  align-items: center;

  font-size: 2.5rem;
  font-weight: 500;

  width: 100%;
  height: 100px;
`;
export const S_FileBox = styled.div`
  width: 930px;
  height: 500px;

  color: #ccc;
  font-size: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 3px dotted #ccc;
`;

export const S_UploadBottom = styled.div`
  ${RowFlex}
  justify-content: space-between;

  padding-top: 40px;

  width: 930px;
`;

export const S_UploadBottomLeft = styled.div`
  ${ColFlex}
  justify-content: flex-start;
`;
export const S_TagInput = styled.input`
  width: 500px;
  /* height: 25px; */
  border: 1px solid #ccc;
  font-size: 1rem;
  border-radius: var(--box-radius-10);
  margin-bottom: 10px;
  padding: 8px;

  &:focus {
    border: 1px solid var(--color-primary-green);
    ::placeholder {
      color: #fff;
    }
  }

  ::placeholder {
    color: var(--color-primary-gray20);
  }
`;

export const S_UploadBottomLight = styled.div`
  ${ColFlex}
  > Button {
    margin-bottom: 10px;
    font-size: 1rem;
  }
`;

export const S_TagBox = styled.div`
  ${RowFlex}
`;
export const S_Tag = styled.button`
  ${RowFlex}
  margin-right: 5px;
  padding: 9px 7px 7px;
  border: var(--color-tag-line);
  border-radius: var(--box-radius-10);
  font-size: var(--font-size-sm);
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: var(--color-primary-green);
    color: #fff;
    border: 1px solid var(--color-primary-green);
    cursor: pointer;
  }
`;
