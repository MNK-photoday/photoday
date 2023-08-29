import React, { PropsWithChildren, useState } from 'react';
import { ImageCardProps } from '../components/common/ImageCardList/ImageCardList';

type ImageContextProps = {
  items: ImageCardProps[];
  setItems: React.Dispatch<React.SetStateAction<ImageCardProps[]>>;
};
export const ImageContext = React.createContext<ImageContextProps | null>(null);

const ItemStore = ({ children }: PropsWithChildren<{}>) => {
  const [items, setItems] = useState<ImageCardProps[]>([]);
  return (
    <ImageContext.Provider value={{ items, setItems }}>
      {children}
    </ImageContext.Provider>
  );
};

export default ItemStore;
