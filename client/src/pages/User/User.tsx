import {
  S_UserPageContainer,
  S_UserSection,
  S_UserThumnailArea,
  S_UserProfileIamge,
  S_UserFollowContainer,
  S_UserFollowCount,
  S_UserFollow,
  S_UserInfoArea,
  S_UserNameContainer,
  S_UserName,
  S_UserLikeAndReport,
  S_UserDescription,
  S_TextButtonWrap,
  S_TextButton,
  S_DeleteAccountText,
  S_UserPageTitleWrap,
  S_UserPageTitle,
  S_UserPageTitlePoint,
  S_BookmarkButton,
  S_UserPhotoContentBox,
  S_UserPhotoContent,
  S_Pagination,
} from './User.styles';
import { ContainerWrap, Container } from '../../styles/Layout';
import oceanImage from '../../assets/imgs/image9.jpg';
import kungyaImage from '../../assets/imgs/kungyaImage.png';
import Button from '../../components/common/Button/Button';
import { FaHeart } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { FaRegBookmark } from 'react-icons/fa';

// 나중에 데이터 받아올 때 쓸 interface
interface DataType {
  data: UserData[];
}

interface UserData {
  userId: number;
  name: string;
  profileImageUrl: string;
  description: string;
  likeCount: number;
  reportCount: number;
  followerCount: number;
  followingCount: number;
  checkFollow: boolean;
}

// 임시 데이터
const data: DataType = {
  data: [
    {
      userId: 1,
      name: 'dkgus',
      profileImageUrl:
        'https://cdn.discordapp.com/attachments/1082610363712950272/1082610364371435540/userImage.png',
      description: '안녕하세요!',
      likeCount: 0,
      reportCount: 0,
      followerCount: 0,
      followingCount: 0,
      checkFollow: false,
    },
    {
      userId: 1,
      name: 'test',
      profileImageUrl:
        'https://cdn.discordapp.com/attachments/1082610363712950272/1082610364371435540/userImage.png',
      description: '안녕하세요!',
      likeCount: 0,
      reportCount: 0,
      followerCount: 0,
      followingCount: 0,
      checkFollow: false,
    },
  ],
};

function Users() {
  return (
    <ContainerWrap>
      <S_UserPageContainer>
        <S_UserSection>
          <S_UserThumnailArea>
            <S_UserProfileIamge
              alt="user profile"
              src={data.data[0].profileImageUrl}
            />
            <S_UserFollowContainer>
              <div>
                <S_UserFollowCount>
                  {data.data[0].followerCount}
                </S_UserFollowCount>
                <S_UserFollow>Follower</S_UserFollow>
              </div>
              <div>
                <S_UserFollowCount>
                  {data.data[0].followingCount}
                </S_UserFollowCount>
                <S_UserFollow>Following</S_UserFollow>
              </div>
            </S_UserFollowContainer>
            <Button variant="point" shape="default" size="large">
              Upload Image
            </Button>
            <Button variant="point" shape="default" size="XLarge">
              Remove Image
            </Button>
          </S_UserThumnailArea>
          <S_UserInfoArea>
            <S_UserNameContainer>
              <S_UserName>{data.data[0].name}</S_UserName>
              <FaHeart size={18} className="likeicon" />
              <S_UserLikeAndReport>
                {data.data[0].likeCount}
              </S_UserLikeAndReport>
              <MdReportProblem size={20} className="reporticon" />
              <S_UserLikeAndReport>
                {data.data[0].reportCount}
              </S_UserLikeAndReport>
            </S_UserNameContainer>
            <S_UserDescription>{data.data[0].description}</S_UserDescription>
            <S_TextButtonWrap>
              <S_TextButton isTextButtonType="modify">Modify</S_TextButton>
              <S_TextButton isTextButtonType="changePassword">
                Change Password
              </S_TextButton>
              <S_TextButton isTextButtonType="deleteAccount">
                Delete account
              </S_TextButton>
              <S_DeleteAccountText>
                Once you delete your account, there is no going back. Please be
                certain.
              </S_DeleteAccountText>
            </S_TextButtonWrap>
          </S_UserInfoArea>
        </S_UserSection>
        <S_UserPageTitleWrap>
          <S_UserPageTitle>
            {`${data.data[0].name}'s pho`}
            <S_UserPageTitlePoint>to</S_UserPageTitlePoint>
            day
          </S_UserPageTitle>
          <S_BookmarkButton>
            {/* 북마크 버튼 누르면 유저가 북마크한 게시물 나옴 */}
            <FaRegBookmark className="bookmarkIcon" />
          </S_BookmarkButton>
        </S_UserPageTitleWrap>
        <S_UserPhotoContentBox>
          <S_UserPhotoContent alt="photo" src={oceanImage} />
          <S_UserPhotoContent alt="photo" src={kungyaImage} />
          <S_UserPhotoContent alt="photo" src={oceanImage} />
          <S_UserPhotoContent alt="photo" src={oceanImage} />
          <S_UserPhotoContent alt="photo" src={oceanImage} />
          <S_UserPhotoContent alt="photo" src={oceanImage} />
        </S_UserPhotoContentBox>
        {/* 페이지 네이션 추가 후, 수정 */}
        <S_Pagination>1 2 3 4 5 6</S_Pagination>
      </S_UserPageContainer>
    </ContainerWrap>
  );
}

export default Users;
