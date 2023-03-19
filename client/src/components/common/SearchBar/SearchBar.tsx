import React from 'react';
import { BsSearch } from 'react-icons/bs';

import { S_SearchBarInput, S_SearchBarWrap } from './SearchBar.styles';

type SearchBarProps = {
  setActiveTextBox?: (isActive: boolean) => void;
  activeSearchBar?: boolean;
};
function SearchBar({ setActiveTextBox, activeSearchBar }: SearchBarProps) {
  function keydownhandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (setActiveTextBox) {
      if (event.key === 'Enter') {
        setActiveTextBox(false);
      }
    }
  }
  return (
    <S_SearchBarWrap active={activeSearchBar}>
      <BsSearch className="search-icon" />
      <S_SearchBarInput onKeyDown={keydownhandler}></S_SearchBarInput>
    </S_SearchBarWrap>
  );
}

export default SearchBar;
