import { S_Skeleton } from './Skeleton.style';

export type SkeletonProps = {
  width?: number; //가로 사이즈
  height?: number; //세로 사이즈
  circle?: boolean; //원형 스켈레톤
  rounded?: boolean; //모서리 둥글게
  unit?: string; //px or % 단위 선택
  animation?: boolean; //애니메이션 유무
  color?: string; //배경색
};
function Skeleton({
  animation = true,
  width,
  height,
  circle,
  rounded,
  unit = 'px',
  color = '#F4F4F4',
}: SkeletonProps) {
  return (
    <S_Skeleton
      width={width}
      height={height}
      circle={circle}
      rounded={rounded}
      unit={unit}
      animation={animation}
      color={color}
    ></S_Skeleton>
  );
}

export default Skeleton;
