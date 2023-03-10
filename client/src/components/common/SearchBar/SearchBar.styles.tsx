import styled from 'styled-components';

export const SearchBarWrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;

  .search-icon {
    font-size: 15px;
    position: absolute;
    left: 15px;
  }
`;

export const SearchBarInput = styled.input`
  border-radius: 15px;
  background-color: var(--color-primary-gray10);
  height: 30px;
  width: 100%;
  padding: 3px 35px;
  border: none;
  outline: none;
  font-size: var(--font-size-m);
`;
