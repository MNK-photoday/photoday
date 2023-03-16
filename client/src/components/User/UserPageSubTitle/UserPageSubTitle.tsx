import {
  S_UserPageSubTitleWrap,
  S_UserPageSubTitlePoint,
  S_BookmarkButton,
} from './UserPageSubTitle.styles';
import { FaRegBookmark } from 'react-icons/fa';

interface IProps {
  username: string;
}

function UserPageSubTitle({ username }: IProps) {
  return (
    <S_UserPageSubTitleWrap>
      <h2>
        <S_UserPageSubTitlePoint>{username}</S_UserPageSubTitlePoint>
        's pho
        <S_UserPageSubTitlePoint>to</S_UserPageSubTitlePoint>
        day
      </h2>
      <S_BookmarkButton>
        {/* 북마크 버튼 누르면 유저가 북마크한 게시물 나옴 */}
        <FaRegBookmark className="bookmarkIcon" />
      </S_BookmarkButton>
    </S_UserPageSubTitleWrap>
  );
}

export default UserPageSubTitle;
