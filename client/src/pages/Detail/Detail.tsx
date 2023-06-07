import { useState, useEffect, useContext } from 'react';
import { Container, ContainerWrap } from '../../styles/Layout';
import Button from '../../components/common/Button/Button';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { FiUserPlus, FiUserCheck, FiUserMinus } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';
import { BiDotsVerticalRounded } from 'react-icons/bi';
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
  S_TagBox,
  S_TagWrap,
  S_TagEditInput,
} from './Detail.styles';
import TagList from '../../components/Upload/Tag/TagList';
import ImageCardList from '../../components/common/ImageCardList/ImageCardList';
import DetailModal from './DetailModal';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Tags } from '../Upload/Upload';
import { SearchContext } from '../../context/SearchContext';
import { PageNumContext } from '../../context/PageNumContext';
import { ItemContext } from '../../context/ItemContext';
import MainImageLoding from './MainImageLoding';

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
  adminCheck: boolean;
};
function Detail() {
  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useState<DetailInfo>();
  const [tags, setTags] = useState<Tags[]>([]);
  const [modiTags, setModiTags] = useState<Tags[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isLikeCount, setIsLikeCount] = useState(0);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isMyImage, setIsMyImage] = useState(false);
  const [isTagEditMode, setIsTagEditMode] = useState(false);
  const [isTagEditComplete, setIsTagEditComplete] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTagModified, setIsTagModified] = useState(false);
  const [loding, setLoding] = useState(false);

  const token = localStorage.getItem('accessToken');
  const headers = {
    headers: { Authorization: token },
  };

  const SEARCH_CONTEXT = useContext(SearchContext);
  const PAGE_NUM_CONTEXT = useContext(PageNumContext);
  const ITEM_CONTEXT = useContext(ItemContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoding(true);
    axios
      .get(`${import.meta.env.VITE_APP_API}/images/${id}`, headers)
      .then((res) => {
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
          adminCheck: response.checkAdmin,
        });
        setLoding(false);
        setIsBookmark(response.bookmark);
        setIsLike(response.like);
        setIsLikeCount(response.likeCount);
        setIsFollowing(response.owner.checkFollow);
        setIsMyImage(response.myImage);
        if (response.tags.length > 0) {
          const objectArray: Tags[] = response.tags.map(
            (tag: string, index: number) => {
              return { id: index, name: tag };
            },
          );
          setTags(objectArray);
          let searchtags: string = '';
          objectArray.forEach((el) => {
            searchtags += ` ${el['name']}`;
          });
          PAGE_NUM_CONTEXT?.setPageNumber(1);
          ITEM_CONTEXT?.setItems([]);
          SEARCH_CONTEXT?.setSearchWord(searchtags);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      PAGE_NUM_CONTEXT?.setPageNumber(1);
      ITEM_CONTEXT?.setItems([]);
    };
  }, [isTagModified, id]);

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

  const downloadFile = (): void => {
    if (detailInfo) {
      const fileName = detailInfo.image.substring(62);
      const a = document.createElement('a');
      const url = `${
        import.meta.env.VITE_APP_API
      }/images/download?imagePath=${fileName}`;
      a.href = url;
      a.click();
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
        setIsLikeCount(res.data.data.likeCount);
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
  const editModeClickHandler = () => {
    setIsTagEditMode(!isTagEditMode);
    setIsTagEditComplete(!isTagEditComplete);
    setModiTags(tags);
  };

  const inputTagHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const removeTagHandler = (id: number) => {
    setModiTags(modiTags.filter((tag) => tag.id !== id));
  };

  const createTagHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue !== '') {
      setModiTags([...modiTags, { id: modiTags.length, name: inputValue }]);
      setInputValue('');
    }
  };
  const modiTagsStringArray = modiTags.map((tag) => {
    return tag.name;
  });
  const tagModifyHandler = () => {
    axios
      .patch(
        `${import.meta.env.VITE_APP_API}/images/${id}`,
        { tags: modiTagsStringArray },
        headers,
      )
      .then(() => {
        setIsTagEditMode(!isTagEditMode);
        setIsTagEditComplete(!isTagEditComplete);
        setIsTagModified(!isTagModified);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate('/login');
        }
      });
  };
  const deleteClickHandler = () => {
    axios
      .delete(`${import.meta.env.VITE_APP_API}/images/${id}`, headers)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const reportClickHandler = () => {
    axios
      .post(
        `${import.meta.env.VITE_APP_API}/images/${id}/reports`,
        null,
        headers,
      )
      .then((res) => {
        if (res.data.data.report) {
          alert('Report completed');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate('/login');
        } else if (err.response.status === 409) {
          alert('You can only report it once');
        }
      });
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
                {isOpenModal && (
                  <DetailModal
                    isMyImage={isMyImage}
                    adminCheck={detailInfo?.adminCheck}
                    deleteHandler={deleteClickHandler}
                    reportHandler={reportClickHandler}
                  />
                )}
              </S_IconBox>
            </S_ContentsTop>
            <S_Contents>
              {loding ? (
                <MainImageLoding />
              ) : (
                <img src={detailInfo?.image} alt="상세이미지" />
              )}
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
                  {isLikeCount}
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
          <S_TagWrap>
            {isTagEditMode ? (
              <>
                <S_TagEditInput
                  placeholder="add to tag"
                  type="text"
                  value={inputValue}
                  onChange={inputTagHandler}
                  onKeyPress={createTagHandler}
                ></S_TagEditInput>
                <TagList
                  tags={modiTags}
                  onRemove={removeTagHandler}
                  isModificationMode={true}
                />
              </>
            ) : (
              <TagList tags={tags} isModificationMode={false} />
            )}
            {isMyImage &&
              (isTagEditComplete ? (
                <S_TagBox>
                  <Button
                    variant="point"
                    shape="round"
                    size="small"
                    clickEventHandler={tagModifyHandler}
                  >
                    Save
                  </Button>
                </S_TagBox>
              ) : (
                <S_TagBox>
                  <Button
                    variant="point"
                    shape="round"
                    size="small"
                    clickEventHandler={editModeClickHandler}
                  >
                    Edit tag
                  </Button>
                </S_TagBox>
              ))}
          </S_TagWrap>
          <S_SeachList>
            <ImageCardList width={400} height={300} />
          </S_SeachList>
        </S_DetailBox>
      </Container>
    </ContainerWrap>
  );
}

export default Detail;
