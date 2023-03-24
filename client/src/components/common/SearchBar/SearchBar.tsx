import { useContext, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemContext } from '../../../context/ItemContext';
import { PageNumContext } from '../../../context/PageNumContext';
import { SearchContext } from '../../../context/SearchContext';
import { S_SearchBarInput, S_SearchBarWrap } from './SearchBar.styles';

type SearchBarProps = {
  setActiveTextBox?: React.Dispatch<React.SetStateAction<boolean>>;
  activeSearchBar?: boolean;
};

function SearchBar({ setActiveTextBox, activeSearchBar }: SearchBarProps) {
  const [isInputNull, setIsInputNull] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const ITEM_CONTEXT = useContext(ItemContext);
  const SEARCH_CONTENT = useContext(SearchContext);
  const PAGE_NUM_CONTENT = useContext(PageNumContext);

  const keydownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      let currentWord = inputRef.current?.value;
      if (currentWord === '') {
        setTimeout(() => {
          setIsInputNull(true);
        }, 300);
      } else {
        if (setActiveTextBox) setActiveTextBox(false);
        if (currentWord) SEARCH_CONTENT?.setSearchWord(currentWord);
      }
      if (activeSearchBar) navigate(`/tags/${currentWord}`);
      setIsInputNull(false);
      ITEM_CONTEXT?.setItems([]);
      PAGE_NUM_CONTENT?.setPageNumber(1);
    }
  };

  return (
    <S_SearchBarWrap active={activeSearchBar}>
      <BsSearch className="search-icon" />
      <S_SearchBarInput
        onKeyPress={keydownHandler}
        ref={inputRef}
        isInputNull={isInputNull}
      ></S_SearchBarInput>
    </S_SearchBarWrap>
  );
}

export default SearchBar;
