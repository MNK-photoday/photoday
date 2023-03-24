import { useState, useEffect } from 'react';
import {
  S_UserPageSubTitleWrap,
  S_UserPageSubTitlePoint,
  S_UserPhotoContentContainer,
  S_Tab,
} from './UserContentSection.styles';
import { S_ImageCardBox } from '../../common/ImageCardList/ImageCardList.styles';
import { getUserPosts, PageInfo, Image } from '../../../api/User';
import Pagination from '../../common/Pagination/Pagination';
import ImageCard from '../../common/ImageCard/ImageCard';

type User = {
  userName: string;
  isMyPage: boolean;
  id: string | null;
  userId: string | undefined;
};

function UserContentSection({ userName, isMyPage, id, userId }: User) {
  const [posts, setPosts] = useState<Image[]>([]);
  const [pagination, setPagination] = useState<PageInfo>({
    pageNumber: 1,
    size: 6,
    totalPages: 1,
    totalElements: 1,
  });
  const [currentTap, setCurrentTap] = useState('user');
  const [paginate, setPaginate] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserPosts(isMyPage ? id : userId, paginate);
        const postData = response.data;
        const paginationData: PageInfo = response.pageInfo;
        setPosts(postData);
        setPagination(paginationData);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [paginate]);

  const userTapHandler = () => {
    setCurrentTap('user');
  };

  const bookmarkTapHandler = () => {
    setCurrentTap('bookmark');
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
        {isMyPage && (
          <S_Tab className="bookmark" onClick={bookmarkTapHandler}>
            Bookmark
          </S_Tab>
        )}
      </S_UserPageSubTitleWrap>
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
  );
}

export default UserContentSection;
