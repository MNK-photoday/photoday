import { useState, useEffect } from 'react';
import { Container, ContainerWrap } from '../../styles/Layout';
import Button from '../../components/common/Button/Button';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { RiAlarmWarningFill } from 'react-icons/ri';
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
} from './Detail.styles';
import TEST_IMAGE from '../../assets/imgs/image1.jpg';
import TEST_USER from '../../assets/imgs/userDefaultProfile.png';
import TagList from '../../components/Upload/Tag/TagList';
import ImageCardList from '../../components/common/ImageCardList/ImageCardList';
import DetailModal from './DetailModal';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
};
function Detail() {
  const [detailInfo, setDetailInfo] = useState<DetailInfo>();
  const [tags, setTags] = useState<Tags[]>([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API}/images/${id}`)
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
        });
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
  }, []);

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

  const imageDownloadHandler = () => {
    if (detailInfo) {
      const link = document.createElement('a');
      const fileExtension = extractFileExtensionFromUrl(detailInfo.image);
      link.download = `photoday_download${id}.${fileExtension}`;
      link.href = detailInfo?.image;
      link.click();
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
                <div className="user-name">{detailInfo?.userName}</div>
                <div className="user-follow">
                  <FiUserPlus size={20} />
                </div>
              </S_UserBox>
              <S_IconBox isModal={isOpenModal}>
                <FaBookmark size={18} className="bookmark-icon" />
                <FaHeart size={20} className="like-icon" />
                <BiDotsVerticalRounded
                  size={20}
                  className="dots-icon"
                  onClick={handleOpenModal}
                />
                {isOpenModal && <DetailModal />}
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
                clickEventHandler={imageDownloadHandler}
              >
                Download
              </Button>
            </S_ContentsBottom>
          </S_PicBox>
          <TagList tags={tags} isModificationMode={false} />
          <S_SeachList>
            <ImageCardList width="400" />
          </S_SeachList>
        </S_DetailBox>
      </Container>
    </ContainerWrap>
  );
}

export default Detail;
