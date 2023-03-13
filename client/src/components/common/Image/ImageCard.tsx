import CardImage from '../../../assets/imgs/image2.jpg';
import { S_CardImageBox, S_CardImage } from './ImageCard.style';

function ImageCard() {
  return (
    <S_CardImageBox>
      <S_CardImage src={CardImage} alt="검색된 이미지" />
    </S_CardImageBox>
  );
}

export default ImageCard;
