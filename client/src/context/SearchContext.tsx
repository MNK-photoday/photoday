import React, { PropsWithChildren, useState } from 'react';

type SearchContextProps = {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = React.createContext<SearchContextProps | null>(
  null,
);

const SearchStore = ({ children }: PropsWithChildren<{}>) => {
  const [searchWord, setSearchWord] = useState('');
  return (
    <SearchContext.Provider value={{ searchWord, setSearchWord }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchStore;
