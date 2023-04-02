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
  const [likestate, setlikeState] = useState<boolean>();
  const [bookstate, setBookmarkState] = useState<boolean>();
  const navigate = useNavigate();
  const clickEventHanelr = async (type: string) => {
    if (type === 'like') {
      try {
        await patchLikeImage(item.imageId);
        setlikeState(!detail?.like);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            navigate('/login');
          }
        }
      }
    } else if (type === 'bookmark') {
      try {
        await patchBookmarkImage(item.imageId);
        setBookmarkState(!detail?.bookmark);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            navigate('/login');
          }
        }
      }
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
  }, [likestate, bookstate]);

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
              activelike={detail?.like?.toString()}
              onClick={() => clickEventHanelr('like')}
            />
          </S_IconBox>
          <S_IconBox>
            <Bookmark
              activebookmark={detail?.bookmark?.toString()}
              onClick={() => clickEventHanelr('bookmark')}
            />
          </S_IconBox>
        </S_OverlayControlsBox>
      </S_OverlayControls>
    </S_CardImagePicture>
  );
}

export default ImageCard;
