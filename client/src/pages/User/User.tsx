import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

function Users() {
  const dispatch = useDispatch();
  const { userId } = useParams(); // 보려고 하는 user id
  const id = useSelector((state: RootState) => state.auth.id); // my id
  const userData = useSelector((state: RootState) => state.user);
  const isMyPage = userId === id || userId === undefined;

  // console.log('접속한 사람', id);
  // console.log('파람', userId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser(isMyPage ? id : userId);
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
          <UserThumnailArea userData={userData} isMyPage={isMyPage} />
          <UserInfoArea userData={userData} isMyPage={isMyPage} />
        </S_UserSection>
        <UserPageSubTitle
          userName={userData.name}
          isMyPage={isMyPage}
          id={id}
          userId={userId}
        />
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
