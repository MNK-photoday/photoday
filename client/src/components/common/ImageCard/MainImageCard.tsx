import {
  S_MainImageCardBox,
  S_MainImageContentBox,
} from './MainImageCard.styles';
import { useEffect, useState } from 'react';
import MainSkeleton from '../Skeleton/MainSkeleton';
import ImageCard from './ImageCard';
import { Mainimages } from './ImageData';

export type ImageItemProps = {
  imageId: number;
  imageUrl: string;
  like: boolean;
  bookmark: boolean;
};

function MainImageCard() {
  /*데이터 호출 전에 테스트 코드입니다. */
  const [items, setItems] = useState<ImageItemProps[]>([]);
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    const randomNum1 = Math.floor(Math.random() * 3);
    const randomNum2 = Math.floor(Math.random() * 3);
    setIsLoading(true);
    /*API 호출 위치*/
    setItems([Mainimages[randomNum1], Mainimages[randomNum2]]);
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
