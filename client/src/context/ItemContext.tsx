import React, { PropsWithChildren, useState } from 'react';
import { ImageCardProps } from '../components/common/ImageCardList/ImageCardList';

type ItemContextProps = {
  items: ImageCardProps[];
  setItems: React.Dispatch<React.SetStateAction<ImageCardProps[]>>;
};
export const ItemContext = React.createContext<ItemContextProps | null>(null);

const ItemStore = ({ children }: PropsWithChildren<{}>) => {
  const [items, setItems] = useState<ImageCardProps[]>([]);
  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemStore;
