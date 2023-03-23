import React, { PropsWithChildren, useState } from 'react';

type LoadingContextProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingContext = React.createContext<LoadingContextProps | null>(
  null,
);

const LoadingStore = ({ children }: PropsWithChildren<{}>) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingStore;
