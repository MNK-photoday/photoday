import { S_SkeletonImageCardWrap } from '../ImageCardList/ImageCardList.styles';
import Skeleton from './Skeleton';
type ImageCardSkeletonProps = {
  width?: number;
  height?: number;
  count: number;
};

function ImageCardSkeleton({ count, height, width }: ImageCardSkeletonProps) {
  return (
    <S_SkeletonImageCardWrap height={height} matrix="columns">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} height={height} width={width} animation={true} />
      ))}
    </S_SkeletonImageCardWrap>
  );
}

export default ImageCardSkeleton;
