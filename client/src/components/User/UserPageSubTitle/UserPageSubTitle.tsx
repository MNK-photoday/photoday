import {
  S_UserPageSubTitleWrap,
  S_UserPageSubTitlePoint,
  S_BookmarkButton,
} from './UserPageSubTitle.styles';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

interface IProps {
  userName: string;
}

function UserPageSubTitle({ userName }: IProps) {
  return (
    <S_UserPageSubTitleWrap>
      <h2>
        <S_UserPageSubTitlePoint>{userName}</S_UserPageSubTitlePoint>
        's pho
        <S_UserPageSubTitlePoint>to</S_UserPageSubTitlePoint>
        day
      </h2>
      {/* 북마크 버튼 누르면 유저가 북마크한 게시물 나옴, 북마크 아이콘 고민 중 */}
      <S_BookmarkButton>
        <FaRegBookmark className="bookmarkIcon" />
      </S_BookmarkButton>
      <S_BookmarkButton>
        <FaBookmark className="bookmarkIcon" />
      </S_BookmarkButton>
    </S_UserPageSubTitleWrap>
  );
}

export default UserPageSubTitle;
