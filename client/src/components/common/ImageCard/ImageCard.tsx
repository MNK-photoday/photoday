import { FaHeart, FaBookmark } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import {
  S_CardImageLink,
  S_CardImagePicture,
  S_IconBox,
  S_OverlayControls,
  S_OverlayControlsBox,
} from './ImageCard.styles';
import { S_MainImg } from './MainImageCard.styles';

function ImageCard({ item }: any) {
  const { pathname } = useLocation();

  return (
    <S_CardImagePicture>
      <S_CardImageLink to={`/detail/${item.imageId}`}>
        <S_MainImg
          src={item.imageUrl}
          alt="검색된 이미지"
          pathname={pathname}
        />
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
