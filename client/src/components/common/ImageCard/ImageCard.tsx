import CardImage from '../../../assets/imgs/image2.jpg';
import {
  S_CardImage,
  S_CardImageLink,
  S_CardImagePicture,
} from './ImageCard.style';

function ImageCard() {
  return (
    <S_CardImagePicture>
      <S_CardImageLink to="/detail/1">
        <S_CardImage src={CardImage} alt="검색된 이미지" />
      </S_CardImageLink>
    </S_CardImagePicture>
  );
}

export default ImageCard;
