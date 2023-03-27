import { S_MainImageCardBox } from '../ImageCard/MainImageCard.styles';
import Skeleton from './Skeleton';

function MainSkeleton({ count }: any) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <S_MainImageCardBox>
          <Skeleton key={index} height={390} animation={true} />
        </S_MainImageCardBox>
      ))}
    </>
  );
}

export default MainSkeleton;
