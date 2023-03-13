import React, { KeyboardEvent, PropsWithChildren } from 'react';
import { BsSearch } from 'react-icons/bs';
import { S_SearchBarInput, S_SearchBarWrap } from './SearchBar.styles';
type Props = {
  setActiveTextBox: (a: boolean) => void;
};
function SearchBar({ setActiveTextBox }: PropsWithChildren<Props>) {
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setActiveTextBox(false);
    }
  }
  return (
    <S_SearchBarWrap>
      <BsSearch className="search-icon" />
      <S_SearchBarInput onKeyDown={handleKeyDown}></S_SearchBarInput>
    </S_SearchBarWrap>
  );
}

export default SearchBar;
