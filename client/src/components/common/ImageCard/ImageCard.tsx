import { FaHeart, FaBookmark } from 'react-icons/fa';
import CardImage from '../../../assets/imgs/image4.jpg';
import {
  S_CardImage,
  S_CardImageLink,
  S_CardImagePicture,
  S_IconBox,
  S_OverlayControls,
  S_OverlayControlsBox,
} from './ImageCard.style';
function ImageCard() {
  return (
    <S_CardImagePicture>
      <S_CardImageLink to="/detail/1">
        <S_CardImage src={CardImage} alt="검색된 이미지" />
      </S_CardImageLink>
      <S_OverlayControls>
        <S_OverlayControlsBox>
          <S_IconBox>
            <FaHeart size={20} className="like-icon" />
          </S_IconBox>
          <S_IconBox>
            <FaBookmark size={18} className="bookmark-icon" />
          </S_IconBox>
        </S_OverlayControlsBox>
      </S_OverlayControls>
    </S_CardImagePicture>
  );
}

export default ImageCard;
