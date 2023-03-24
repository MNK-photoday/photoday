import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { S_UserPageContainer, S_UserSection } from './User.styles';
import { ContainerWrap } from '../../styles/Layout';
import { getUser } from '../../api/User';
import { RootState } from '../../store/store';
import { setData } from '../../store/userSlice';
import UserInfoArea from '../../components/User/UserInfoArea/UserInfoArea';
import UserThumnailArea from '../../components/User/UserThumnailArea/UserThumnailArea';
import UserPageSubTitle from '../../components/User/UserContentSection/UserContentSection';

function Users() {
  const dispatch = useDispatch();
  const { userId } = useParams(); // 보려고 하는 user id
  const id = useSelector((state: RootState) => state.auth.id); // my id
  const userData = useSelector((state: RootState) => state.user);
  const isMyPage = userId === id || userId === undefined;

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
      </S_UserPageContainer>
    </ContainerWrap>
  );
}

export default Users;
