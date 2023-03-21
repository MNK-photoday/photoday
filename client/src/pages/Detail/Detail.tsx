import { useState } from 'react';
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
function Detail() {
  const TEST_USERNAME = 'JangEunsu';
  const TEST_VIEW = '123,201,012';
  const TEST_LIKE = '33,221,031';
  const TEST_TAGS = [
    { id: 1, name: '석양' },
    { id: 2, name: '풍경' },
  ];
  const TEST_UPLOAD_DATE = '2020-01-01';

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const handleOpenModal = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault();
    setIsOpenModal(!isOpenModal);
  };
  const handleCloseModal = () => setIsOpenModal(false);
  return (
    <ContainerWrap>
      <Container>
        <S_DetailBox>
          <S_PicBox onMouseLeave={handleCloseModal}>
            <S_ContentsTop>
              <S_UserBox>
                <div className="user-profile">
                  <img src={TEST_USER} alt="user_profile_image" />
                </div>
                <div className="user-name">{TEST_USERNAME}</div>
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
              <img src={TEST_IMAGE} alt="테스트이미지" />
            </S_Contents>
            <S_ContentsBottom>
              <S_CountBox>
                <div>
                  <GrView size={20} className="view-icon" />
                  {TEST_VIEW}
                </div>
                <div>
                  <FaHeart size={18} className="like-icon" />
                  {TEST_LIKE}
                </div>
              </S_CountBox>
              <S_UploadDateBox>{TEST_UPLOAD_DATE}</S_UploadDateBox>
              <Button variant="point" shape="round" size="medium">
                Download
              </Button>
            </S_ContentsBottom>
          </S_PicBox>
          <TagList tags={TEST_TAGS} isModificationMode={false} />
          <S_SeachList>
            <ImageCardList width="400" />
          </S_SeachList>
        </S_DetailBox>
      </Container>
    </ContainerWrap>
  );
}

export default Detail;
