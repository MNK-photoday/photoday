import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { getUser } from '../../api/User';
import { RootState } from '../../store/store';
import { setData } from '../../store/userSlice';

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

function Users() {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser(userId);
        dispatch(setData(response));
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ContainerWrap>
      <S_UserPageContainer>
        <S_UserSection>
          <UserThumnailArea userData={userData} />
          <UserInfoArea userData={userData} />
        </S_UserSection>
        <UserPageSubTitle userName={userData.name} />
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
