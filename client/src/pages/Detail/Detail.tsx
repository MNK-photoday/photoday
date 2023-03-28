import { useState, useEffect, useContext } from 'react';
import { Container, ContainerWrap } from '../../styles/Layout';
import Button from '../../components/common/Button/Button';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { FiUserPlus, FiUserCheck, FiUserMinus } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { SearchContext } from '../../context/SearchContext';
import {
  S_DetailBox,
  S_PicBox,
  S_ContentsTop,
  S_Contents,
  S_ContentsBottom,
  S_SeachList,
  S_UserBox,
  S_IconBox,
  S_CountBox,
  S_UploadDateBox,
} from './Detail.styles';
import TEST_IMAGE from '../../assets/imgs/image1.jpg';
import TEST_USER from '../../assets/imgs/userDefaultProfile.png';
import TagList from '../../components/Upload/Tag/TagList';
import ImageCardList from '../../components/common/ImageCardList/ImageCardList';
import DetailModal from './DetailModal';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Tags } from '../Upload/Upload';

type DetailInfo = {
  image: string;
  userName: string;
  userProfileImage: string;
  viewCount: number;
  likeCount: number;
  tags: string[];
  userLike: boolean;
  userBookmark: boolean;
  createdAt: string;
  ownerId: number;
  followCheck: boolean;
  myImageCheck: boolean;
};
function Detail() {
  const [detailInfo, setDetailInfo] = useState<DetailInfo>();
  const [tags, setTags] = useState<Tags[]>([]);
  const { id } = useParams();

  const token = localStorage.getItem('accessToken');
  const headers = {
    headers: { Authorization: token },
  };

  const [isFollowing, setIsFollowing] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isMyImage, setIsMyImage] = useState(false);

  const SEARCH_CONTEXT = useContext(SearchContext);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/images/${id}`, headers)
      .then((res) => {
        console.log(res.data);
        const response = res.data.data;
        setDetailInfo({
          image: response.imageUrl,
          userName: response.owner.name,
          userProfileImage: response.owner.profileImageUrl,
          viewCount: response.viewCount,
          likeCount: response.likeCount,
          tags: response.tags,
          userLike: response.like,
          userBookmark: response.bookmark,
          createdAt: response.createdAt,
          ownerId: response.owner.userId,
          followCheck: response.owner.checkFollow,
          myImageCheck: response.myImage,
        });
        setIsBookmark(response.bookmark);
        setIsLike(response.like);
        setIsFollowing(response.owner.checkFollow);
        setIsMyImage(response.myImage);
        if (response.tags.length > 0) {
          const objectArray: Tags[] = response.tags.map(
            (tag: string, index: number) => {
              return { id: index, name: tag };
            },
          );
          setTags(objectArray);
          console.log(objectArray);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    SEARCH_CONTEXT?.setSearchWord('둥이');
  }, [isLike, isFollowing]);

  const navigate = useNavigate();

  const dateTypeConverter = (date: string | undefined) => {
    return date?.split('T')[0] + ' ' + date?.split('T')[1].split('.')[0];
  };

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const handleOpenModal = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault();
    setIsOpenModal(!isOpenModal);
  };
  const handleCloseModal = () => setIsOpenModal(false);

  const extractFileExtensionFromUrl = (url: string): string | null => {
    const match = url.match(/\.([a-z0-9]+)(?:[\?#]|$)/i);
    return match ? match[1].toLowerCase() : null;
  };

  const downloadFile = (): void => {
    if (detailInfo) {
      axios
        .get<Blob>(detailInfo?.image, {
          responseType: 'blob',
          withCredentials: true,
        })
        .then((response) => {
          const blob = new Blob([response.data]);
          const a = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = `download.jpg`;
          console.log(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const likeClickHandler = () => {
    axios
      .patch(
        `${import.meta.env.VITE_APP_API}/images/${id}/likes`,
        null,
        headers,
      )
      .then((res) => {
        setIsLike(res.data.data.like);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate('/login');
        }
      });
  };

  const bookmarkClickHandler = () => {
    axios
      .patch(
        `${import.meta.env.VITE_APP_API}/images/${id}/bookmarks`,
        null,
        headers,
      )
      .then((res) => {
        setIsBookmark(res.data.data.bookmark);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate('/login');
        }
      });
  };

  const userClickHandler = () => {
    if (detailInfo !== null) {
      navigate(`/users/${detailInfo?.ownerId}`);
    }
  };
  const userFollowClickHandler = () => {
    if (detailInfo !== null) {
      axios
        .patch(
          `${import.meta.env.VITE_APP_API}/follows/${detailInfo?.ownerId}`,
          null,
          headers,
        )
        .then(() => {
          setIsFollowing(!isFollowing);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            navigate('/login');
          }
        });
    }
  };
  return (
    <ContainerWrap>
      <Container>
        <S_DetailBox>
          <S_PicBox onMouseLeave={handleCloseModal}>
            <S_ContentsTop>
              <S_UserBox>
                <div className="user-profile">
                  <img
                    src={detailInfo?.userProfileImage}
                    alt="user_profile_image"
                  />
                </div>
                <div className="user-name" onClick={userClickHandler}>
                  {detailInfo?.userName}
                </div>
                {isMyImage ? null : (
                  <div className="user-follow" onClick={userFollowClickHandler}>
                    {isFollowing ? (
                      <FiUserMinus size={20} />
                    ) : (
                      <FiUserPlus size={20} />
                    )}
                  </div>
                )}
              </S_UserBox>
              <S_IconBox isModal={isOpenModal}>
                {isBookmark ? (
                  <FaBookmark
                    size={18}
                    className="clicked-bookmark-icon"
                    onClick={bookmarkClickHandler}
                  />
                ) : (
                  <FaBookmark
                    size={18}
                    className="bookmark-icon"
                    onClick={bookmarkClickHandler}
                  />
                )}
                {isLike ? (
                  <FaHeart
                    size={20}
                    className="clicked-like-icon"
                    onClick={likeClickHandler}
                  />
                ) : (
                  <FaHeart
                    size={20}
                    className="like-icon"
                    onClick={likeClickHandler}
                  />
                )}
                <BiDotsVerticalRounded
                  size={20}
                  className="dots-icon"
                  onClick={handleOpenModal}
                />
                {isOpenModal && <DetailModal isMyImage={isMyImage} />}
              </S_IconBox>
            </S_ContentsTop>
            <S_Contents>
              <img src={detailInfo?.image} alt="상세이미지" />
            </S_Contents>
            <S_UploadDateBox>
              {dateTypeConverter(detailInfo?.createdAt)}
            </S_UploadDateBox>
            <S_ContentsBottom>
              <S_CountBox>
                <div>
                  <GrView size={20} className="view-icon" />
                  {detailInfo?.viewCount}
                </div>
                <div>
                  <FaHeart size={18} className="like-icon" />
                  {detailInfo?.likeCount}
                </div>
              </S_CountBox>
              <Button
                variant="point"
                shape="round"
                size="medium"
                clickEventHandler={downloadFile}
              >
                Download
              </Button>
            </S_ContentsBottom>
          </S_PicBox>
          <TagList tags={tags} isModificationMode={false} />
          <S_SeachList>
            <ImageCardList width={400} height={350} />
          </S_SeachList>
        </S_DetailBox>
      </Container>
    </ContainerWrap>
  );
}

export default Detail;
