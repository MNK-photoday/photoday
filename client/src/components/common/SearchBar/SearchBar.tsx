import { useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import { S_SearchBarInput, S_SearchBarWrap } from './SearchBar.styles';

type SearchBarProps = {
  setActiveTextBox?: (isActive: boolean) => void;
  activeSearchBar?: boolean;
};

function SearchBar({ setActiveTextBox, activeSearchBar }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputNull, setIsInputNull] = useState(false);
  const [searchWord, setSearchWord] = useState<string[]>([]);

  function keydownhandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      let currentWord = inputRef.current?.value;
      if (currentWord === '') {
        setTimeout(() => {
          setIsInputNull(true);
        }, 100);
      } else {
        if (setActiveTextBox) {
          setActiveTextBox(false);
        }
        if (currentWord !== undefined) {
          setSearchWord(currentWord.split(/, | |,/));
        }
      }
      setIsInputNull(false);
    }
  }
  console.log(searchWord);
  return (
    <S_SearchBarWrap active={activeSearchBar}>
      <BsSearch className="search-icon" />
      <S_SearchBarInput
        onKeyPress={keydownhandler}
        ref={inputRef}
        isInputNull={isInputNull}
      ></S_SearchBarInput>
    </S_SearchBarWrap>
  );
}

export default SearchBar;
