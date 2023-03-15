import React from 'react';
import { BsSearch } from 'react-icons/bs';

import { S_SearchBarInput, S_SearchBarWrap } from './SearchBar.styles';
type Props = {
  setActiveTextBox?: (isActive: boolean) => void;
};
function SearchBar({ setActiveTextBox }: React.PropsWithChildren<Props>) {
  function keyDownhandle(event: React.KeyboardEvent<HTMLInputElement>) {
    if (setActiveTextBox) {
      if (event.key === 'Enter') {
        setActiveTextBox(false);
      }
    }
  }
  return (
    <S_SearchBarWrap>
      <BsSearch className="search-icon" />
      <S_SearchBarInput onKeyDown={keyDownhandle}></S_SearchBarInput>
    </S_SearchBarWrap>
  );
}

export default SearchBar;
