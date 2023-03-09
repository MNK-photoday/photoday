import React from 'react';
import * as style from './SearchBar.styles';
import { BsSearch } from 'react-icons/bs';

function SearchBar() {
  return (
    <style.SearchBarWrap>
      <BsSearch className="search-icon" />
      <style.SearchBarInput></style.SearchBarInput>
    </style.SearchBarWrap>
  );
}

export default SearchBar;
