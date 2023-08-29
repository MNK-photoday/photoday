import { useContext, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageNumContext } from '../../../context/PageNumContext';
import { SearchContext } from '../../../context/SearchContext';
import { ImageContext } from '../../../context/ItemContext';
import { S_SearchBarInput, S_SearchBarWrap } from './SearchBar.styles';

type SearchBarProps = {
  setActiveTextBox?: React.Dispatch<React.SetStateAction<boolean>>;
  isMainPage?: boolean;
};

function SearchBar({ setActiveTextBox, isMainPage }: SearchBarProps) {
  const IMAGE_CONTEXT = useContext(ImageContext);
  const SEARCH_CONTENT = useContext(SearchContext);
  const PAGE_NUM_CONTEXT = useContext(PageNumContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isInputNull, setIsInputNull] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMain = useState(pathname === '/');

  const resetInputAndPage = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      IMAGE_CONTEXT?.setItems([]);
      PAGE_NUM_CONTEXT?.setPageNumber(1);
    }
  };
  const delayIfNullInput = () => {
    setTimeout(() => {
      setIsInputNull(true);
    }, 300);
  };

  const MainSearchKeyword = () => {
    if (setActiveTextBox) {
      setActiveTextBox(false);
    }
  };

  const keydownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      let inputValue = inputRef.current?.value;
      if (inputValue === '') {
        delayIfNullInput();
        setIsInputNull(false);
      } else {
        isMain && MainSearchKeyword();
        SEARCH_CONTENT?.setSearchWord(inputValue ?? '');
        setIsInputNull(false);
        resetInputAndPage();
      }
      if (isMainPage && inputValue !== '') {
        navigate(`/tags/${inputValue}`);
      }
    }
  };

  return (
    <S_SearchBarWrap active={isMainPage}>
      <BsSearch className="search-icon" />
      <S_SearchBarInput
        placeholder="Search for all images in photoday ex) dog cat ..."
        onKeyDown={keydownHandler}
        ref={inputRef}
        isInputNull={isInputNull}
      ></S_SearchBarInput>
    </S_SearchBarWrap>
  );
}

export default SearchBar;
