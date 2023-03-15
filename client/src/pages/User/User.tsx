import {
  S_UserSection,
  S_UserThumnailArea,
  S_UserProfileIamge,
  S_UserFollowContainer,
  S_UserFollowCount,
  S_UserFollow,
  S_UserInfoArea,
  S_UserPageTitle,
  S_UserPhotoContentBox,
  S_UserPhotoContent,
  S_Pagination,
} from './User.styles';
import { ContainerWrap, Container } from '../../styles/Layout';
import oceanImage from '../../assets/imgs/image9.jpg';
import kungyaImage from '../../assets/imgs/kungyaImage.png';
import Button from '../../components/common/Button/Button';

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
      <Container>
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
            <Button variant="point" shape="default" size="XLarge" disabled>
              Remove Image
            </Button>
          </S_UserThumnailArea>
          <S_UserInfoArea>user info</S_UserInfoArea>
        </S_UserSection>
        <S_UserPageTitle>
          <h3>{`${data.data[0].name}'s photoday`}</h3>
          <div>bookmark Icon</div>
        </S_UserPageTitle>
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
      </Container>
    </ContainerWrap>
  );
}

export default Users;
