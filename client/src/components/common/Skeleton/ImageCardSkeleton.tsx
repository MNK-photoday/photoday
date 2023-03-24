import { S_ImageCardBox } from '../ImageCardList/ImageCardList.styles';
import Skeleton from './Skeleton';
type ImageCardSkeletonProps = {
  width: number;
  height?: number;
  count: number;
};

function ImageCardSkeleton({ count, width, height }: ImageCardSkeletonProps) {
  return (
    <S_ImageCardBox width={width} height={height} matrix="columns">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} height={height} animation={true} />
      ))}
    </S_ImageCardBox>
  );
}

export default ImageCardSkeleton;
