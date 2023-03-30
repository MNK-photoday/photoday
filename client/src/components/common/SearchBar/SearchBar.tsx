import { useContext, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
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
  const PAGE_NUM_CONTEXT = useContext(PageNumContext);
  const [currentWord, setCurrentWord] = useState<string>('');

  const keydownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      let newCurrentWord = inputRef.current?.value;
      if (newCurrentWord === '') {
        setTimeout(() => {
          setIsInputNull(true);
        }, 300);
      } else {
        if (setActiveTextBox) setActiveTextBox(false);
        if (newCurrentWord !== currentWord) {
          SEARCH_CONTENT?.setSearchWord(newCurrentWord ?? '');
          setCurrentWord(newCurrentWord ?? '');
          setIsInputNull(false);
          ITEM_CONTEXT?.setItems([]);
          PAGE_NUM_CONTEXT?.setPageNumber(1);
        }
        if (inputRef.current) {
          inputRef.current.value = '';
          ITEM_CONTEXT?.setItems([]);
          PAGE_NUM_CONTEXT?.setPageNumber(1);
        }
      }
      setIsInputNull(false);

      if (activeSearchBar && newCurrentWord !== '') {
        navigate(`/tags/${newCurrentWord}`);
      }
    }
  };

  return (
    <S_SearchBarWrap active={activeSearchBar}>
      <BsSearch className="search-icon" />
      <S_SearchBarInput
        placeholder="photo search.."
        onKeyPress={keydownHandler}
        ref={inputRef}
        isInputNull={isInputNull}
      ></S_SearchBarInput>
    </S_SearchBarWrap>
  );
}

export default SearchBar;
