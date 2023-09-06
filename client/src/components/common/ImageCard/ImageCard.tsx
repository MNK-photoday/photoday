import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getDetailImage,
  patchBookmarkImage,
  patchLikeImage,
} from '../../../api/Image';
import {
  Bookmark,
  Heart,
  S_CardImageLink,
  S_CardImagePicture,
  S_IconBox,
  S_OverlayControls,
  S_OverlayControlsBox,
} from './ImageCard.styles';
import { S_MainImg } from './MainImageCard.styles';

type ImageCardProps = {
  item: {
    imageId: number;
    imageUrl: string;
  };
};

type ImageDetail = {
  like: boolean;
  bookmark: boolean;
};

function ImageCard({ item }: ImageCardProps) {
  const { pathname } = useLocation();
  const [detail, setDetail] = useState<ImageDetail | null>(null);
  const [likeState, setlikeState] = useState<boolean>(false);
  const [bookMarkState, setbookMarkState] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRequest = async (
    apiFunc: () => Promise<void>,
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      await apiFunc();
      stateSetter((prev) => !prev);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    }
  };

  const clickEventHandler = (type: string) => {
    if (type === 'like') {
      handleRequest(() => patchLikeImage(item.imageId), setlikeState);
    } else if (type === 'bookmark') {
      handleRequest(() => patchBookmarkImage(item.imageId), setbookMarkState);
    }
  };

  useEffect(() => {
    try {
      getDetailImage(item.imageId).then((response) => {
        setDetail(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [likeState, bookMarkState]);

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
            <Heart
              activelike={detail?.like ? 'true' : 'false'}
              onClick={() => clickEventHandler('like')}
            />
          </S_IconBox>
          <S_IconBox>
            <Bookmark
              activebookmark={detail?.bookmark ? 'true' : 'false'}
              onClick={() => clickEventHandler('bookmark')}
            />
          </S_IconBox>
        </S_OverlayControlsBox>
      </S_OverlayControls>
    </S_CardImagePicture>
  );
}

export default ImageCard;
