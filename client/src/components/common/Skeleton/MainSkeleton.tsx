import { S_MainImageContentWrap } from '../ImageCard/MainImageCard.styles';
import Skeleton from './Skeleton';

function MainSkeleton({ count }: any) {
  return (
    <S_MainImageContentWrap>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} height={380} animation={true} />
      ))}
    </S_MainImageContentWrap>
  );
}

export default MainSkeleton;
