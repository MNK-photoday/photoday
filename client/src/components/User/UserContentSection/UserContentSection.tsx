import { useState, useEffect } from 'react';
import {
  S_UserPageSubTitleWrap,
  S_UserPageSubTitlePoint,
  S_UserPhotoContentContainer,
  S_NoPostsGuideContainer,
  S_NoPostsGuideIcon,
  S_NoPostsGuide,
  S_Tab,
} from './UserContentSection.styles';
import { S_ImageCardBox } from '../../common/ImageCardList/ImageCardList.styles';
import { getUserPosts, PageInfo, Image } from '../../../api/User';
import Pagination from '../../common/Pagination/Pagination';
import ImageCard from '../../common/ImageCard/ImageCard';
import { CiImageOff, CiCamera } from 'react-icons/ci';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { BsCamera } from 'react-icons/bs';

type User = {
  userName: string;
  myPage: boolean;
  id: string | null;
  userId: string | undefined;
};

function UserContentSection({ userName, myPage, id, userId }: User) {
  const [posts, setPosts] = useState<Image[]>([]);
  const [pagination, setPagination] = useState<PageInfo>({
    pageNumber: 1,
    size: 6,
    totalPages: 1,
    totalElements: 1,
  });
  const [currentTap, setCurrentTap] = useState('user');
  const [paginate, setPaginate] = useState(1);
  const isMyPage = userId === id || userId === undefined;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserPosts(
          isMyPage ? id : userId,
          paginate,
          currentTap,
        );
        const postData = response.data;
        const paginationData: PageInfo = response.pageInfo;
        setPosts(postData);
        setPagination(paginationData);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [paginate, currentTap, userId]);

  const userTapHandler = () => {
    setCurrentTap('user');
    setPaginate(1);
  };

  const bookmarkTapHandler = () => {
    setCurrentTap('bookmark');
    setPaginate(1);
  };

  return (
    <>
      <S_UserPageSubTitleWrap currentTap={currentTap}>
        <S_Tab className="user" onClick={userTapHandler}>
          <S_UserPageSubTitlePoint>{userName}</S_UserPageSubTitlePoint>
          's pho
          <S_UserPageSubTitlePoint>to</S_UserPageSubTitlePoint>
          day
        </S_Tab>
        {myPage && (
          <S_Tab className="bookmark" onClick={bookmarkTapHandler}>
            Bookmark
          </S_Tab>
        )}
      </S_UserPageSubTitleWrap>
      {posts.length ? (
        <>
          <S_UserPhotoContentContainer>
            {posts.map((post: Image) => (
              <S_ImageCardBox
                key={post.imageId}
                width={240}
                height={220}
                matrix="columns"
              >
                <ImageCard item={post} />
              </S_ImageCardBox>
            ))}
          </S_UserPhotoContentContainer>
          <Pagination pagination={pagination} setPaginate={setPaginate} />
        </>
      ) : (
        // 아이콘 문구 고민 중
        <S_NoPostsGuideContainer>
          <S_NoPostsGuideIcon>
            <CiImageOff size={150} />
          </S_NoPostsGuideIcon>
          <S_NoPostsGuide>No posts found</S_NoPostsGuide>
          {/* <S_NoPostsGuideIcon>
            <CiCamera size={150} />
          </S_NoPostsGuideIcon>
          <S_NoPostsGuide>No posts found</S_NoPostsGuide> */}
          {/* <S_NoPostsGuideIcon>
            <BsCamera size={130} />
          </S_NoPostsGuideIcon>
          <S_NoPostsGuide>Have no posts</S_NoPostsGuide> */}
        </S_NoPostsGuideContainer>
      )}
    </>
  );
}

export default UserContentSection;
