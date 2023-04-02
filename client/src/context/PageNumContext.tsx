import React, { PropsWithChildren, useState } from 'react';

type PageNumContextProps = {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const PageNumContext = React.createContext<PageNumContextProps | null>(
  null,
);

const PageNumStore = ({ children }: PropsWithChildren<{}>) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  return (
    <PageNumContext.Provider value={{ pageNumber, setPageNumber }}>
      {children}
    </PageNumContext.Provider>
  );
};

export default PageNumStore;
