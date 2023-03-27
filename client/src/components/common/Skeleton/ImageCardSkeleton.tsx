import { S_ImageCardWrap } from '../ImageCardList/ImageCardList.styles';
import Skeleton from './Skeleton';
type ImageCardSkeletonProps = {
  height?: number;
  count: number;
};

function ImageCardSkeleton({ count, height }: ImageCardSkeletonProps) {
  return (
    <S_ImageCardWrap height={height} matrix="columns">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} height={height} animation={true} />
      ))}
    </S_ImageCardWrap>
  );
}

export default ImageCardSkeleton;
