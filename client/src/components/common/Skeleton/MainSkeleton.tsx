import { S_MainImageCardBox } from '../ImageCard/MainImageCard.styles';
import Skeleton from './Skeleton';

function MainSkeleton({ count, width, height }: any) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <S_MainImageCardBox key={index}>
          <Skeleton height={height} width={width} animation={true} />
        </S_MainImageCardBox>
      ))}
    </>
  );
}

export default MainSkeleton;
