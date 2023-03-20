import { S_MainImgBox } from '../../../pages/Main/Main.styles';
import Skeleton from './Skeleton';

function MainSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <S_MainImgBox key={index}>
          <Skeleton width={700} height={400} animation={true} />
        </S_MainImgBox>
      ))}
    </>
  );
}

export default MainSkeleton;
