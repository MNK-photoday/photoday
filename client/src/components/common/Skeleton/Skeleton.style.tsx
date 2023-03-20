import styled, { css, keyframes } from 'styled-components';
import { SkeletonProps } from './Skeleton';

const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const pulseAnimation = css`
  animation: ${pulseKeyframe} 1.5s ease-in-out 0.5s infinite;
`;

export const S_Skeleton = styled.div<SkeletonProps>`
  background-color: ${({ color }) => color && color};
  border-radius: ${({ rounded }) => rounded && '8px'};
  border-radius: ${({ circle }) => circle && '50%'};
  display: ${({ width, height }) => (width || height) && 'block'};
  width: ${({ width, unit }) => width && unit && `${width}${unit}`};
  height: ${({ height, unit }) => height && unit && `${height}${unit}`};
  ${({ animation }) => animation && pulseAnimation};
`;
