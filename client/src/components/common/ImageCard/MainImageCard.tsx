import {
  S_MainImageCardBox,
  S_MainImageContentBox,
} from './MainImageCard.styles';
import { useEffect, useState } from 'react';
import MainSkeleton from '../Skeleton/MainSkeleton';
import ImageCard from './ImageCard';
import { getMainImage } from '../../../api/Image';
import { FiFacebook } from 'react-icons/fi';

export type ImageItemProps = {
  imageId: number;
  imageUrl: string;
  like: boolean;
  bookmark: boolean;
};

function MainImageCard() {
  const [items, setItems] = useState<ImageItemProps[]>([]);
  const [isloading, setIsLoading] = useState(true);

  const randomNumFun = () => {
    return Math.floor(Math.random() * 10);
  };

  useEffect(() => {
    setIsLoading(true);
    getMainImage().then((response) => {
      let randomNum1 = randomNumFun();
      let randomNum2 = randomNumFun();

      while (randomNum2 === randomNum1) {
        randomNum2 = randomNumFun();
      }
      setItems([response[randomNum1], response[randomNum2]]);
    });

    setIsLoading(false);
  }, []);

  return (
    <S_MainImageContentBox>
      {isloading ? (
        <MainSkeleton count={2} height={420} />
      ) : (
        <S_MainImageCardBox>
          {items.map((item: ImageItemProps) => (
            <ImageCard key={item.imageId} item={item} />
          ))}
        </S_MainImageCardBox>
      )}
    </S_MainImageContentBox>
  );
}

export default MainImageCard;
