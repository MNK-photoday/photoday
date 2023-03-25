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
import UserContentSection from '../../components/User/UserContentSection/UserContentSection';

function Users() {
  const dispatch = useDispatch();
  const { userId } = useParams(); // 보려고 하는 user id
  const id = useSelector((state: RootState) => state.auth.id); // my id
  const userData = useSelector((state: RootState) => state.user);
  const myPage = useSelector((state: RootState) => state.user.myPage);
  const followerCount = useSelector(
    (state: RootState) => state.user.followerCount,
  );
  const followingCount = useSelector(
    (state: RootState) => state.user.followingCount,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser(
          userId === id || userId === undefined ? id : userId,
        );
        dispatch(setData(response));
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [userId, followerCount, followingCount]);

  return (
    <ContainerWrap>
      <S_UserPageContainer>
        <S_UserSection>
          <UserThumnailArea userData={userData} myPage={myPage} />
          <UserInfoArea userData={userData} myPage={myPage} />
        </S_UserSection>
        <UserContentSection
          userName={userData.name}
          myPage={myPage}
          id={id}
          userId={userId}
        />
      </S_UserPageContainer>
    </ContainerWrap>
  );
}

export default Users;
