import { string } from 'prop-types';
import ImageCard from '../ImageCard/ImageCard';
import { S_ImageCardBox } from './ImageCardList.styles';

export type ImageCardListProps = {
  width: string;
  matrix?: 'columns' | 'rows';
};
function ImageCardList({ width, matrix = 'columns' }: ImageCardListProps) {
  return (
    <S_ImageCardBox width={width} matrix={matrix}>
      <ImageCard></ImageCard>
      <ImageCard></ImageCard>
      <ImageCard></ImageCard>
      <ImageCard></ImageCard>
    </S_ImageCardBox>
  );
}

export default ImageCardList;
