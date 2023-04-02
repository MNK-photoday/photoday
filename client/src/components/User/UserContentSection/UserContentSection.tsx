import { useState, useEffect } from 'react';
import {
  S_UserPageSubTitleContainer,
  S_UserPageSubTitlePoint,
  S_UserPhotoContentContainer,
  S_NoPostsGuideContainer,
  S_NoPostsGuideIcon,
  S_NoPostsGuide,
  S_Tab,
} from './UserContentSection.styles';
import { getUserPosts, PageInfo, Image } from '../../../api/User';
import Pagination from '../../common/Pagination/Pagination';
import ImageCard from '../../common/ImageCard/ImageCard';
import { CiImageOff } from 'react-icons/ci';
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
      <S_UserPageSubTitleContainer currentTap={currentTap}>
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
      </S_UserPageSubTitleContainer>
      {posts.length ? (
        <>
          <S_UserPhotoContentContainer>
            {posts.map((post: Image) => (
              <ImageCard key={post.imageId} item={post} />
            ))}
          </S_UserPhotoContentContainer>
          <Pagination
            pagination={pagination}
            paginate={paginate}
            setPaginate={setPaginate}
          />
        </>
      ) : (
        <S_NoPostsGuideContainer>
          <S_NoPostsGuideIcon>
            <CiImageOff size={130} />
          </S_NoPostsGuideIcon>
          <S_NoPostsGuide>Have no posts</S_NoPostsGuide>
        </S_NoPostsGuideContainer>
      )}
    </>
  );
}

export default UserContentSection;
