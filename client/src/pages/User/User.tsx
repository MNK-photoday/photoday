import {
  S_UserPageContainer,
  S_UserSection,
  S_UserPhotoContentBox,
  S_UserPhotoContent,
  S_Pagination,
} from './User.styles';
import { ContainerWrap } from '../../styles/Layout';
import oceanImage from '../../assets/imgs/image9.jpg';
import UserInfoArea from '../../components/User/UserInfoArea/UserInfoArea';
import UserThumnailArea from '../../components/User/UserThumnailArea/UserThumnailArea';
import UserPageSubTitle from '../../components/User/UserPageSubTitle/UserPageSubTitle';

// 나중에 데이터 받아올 때 쓸 interface
export interface DataType {
  data: UserData[];
}

export interface UserData {
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

// 임시 데이터, 나중에 삭제
const data: DataType = {
  data: [
    {
      userId: 1,
      name: 'Ahyeon',
      profileImageUrl:
        'https://cdn.discordapp.com/attachments/1082610363712950272/1082610364371435540/userImage.png',
      description: '안녕하세요!',
      likeCount: 5,
      reportCount: 0,
      followerCount: 5,
      followingCount: 5,
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
          <UserThumnailArea userdata={data} />
          <UserInfoArea userdata={data} />
        </S_UserSection>
        <UserPageSubTitle username={data.data[0].name} />
        <S_UserPhotoContentBox>
          {/* Photo Content 컴포넌트 만들어지면 수정 */}
          <S_UserPhotoContent alt="photo" src={oceanImage} />
          <S_UserPhotoContent alt="photo" src={oceanImage} />
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
