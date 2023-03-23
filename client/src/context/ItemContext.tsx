import React, { PropsWithChildren, useState } from 'react';
import { ImageItemProps } from '../components/common/ImageCardList/ImageCardList';

type ItemContextProps = {
  items: ImageItemProps[];
  setItems: React.Dispatch<React.SetStateAction<ImageItemProps[]>>;
};
export const ItemContext = React.createContext<ItemContextProps | null>(null);

const ItemStore = ({ children }: PropsWithChildren<{}>) => {
  const [items, setItems] = useState<ImageItemProps[]>([]);
  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemStore;
