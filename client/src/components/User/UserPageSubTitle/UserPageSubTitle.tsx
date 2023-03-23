import { useState, useEffect } from 'react';
import {
  S_UserPageSubTitleWrap,
  S_UserPageSubTitlePoint,
  S_Tab,
} from './UserPageSubTitle.styles';
import { getUserImages } from '../../../api/User';

type User = {
  userName: string;
  isMyPage: boolean;
  id: string | null;
  userId: string | undefined;
};

function UserPageSubTitle({ userName, isMyPage, id, userId }: User) {
  const [posts, setPosts] = useState([]);
  const [currentTap, setCurrentTap] = useState('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserImages(isMyPage ? id : userId);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const userTapHandler = () => {
    setCurrentTap('user');
  };

  const bookmarkTapHandler = () => {
    setCurrentTap('bookmark');
  };

  return (
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
  );
}

export default UserPageSubTitle;
