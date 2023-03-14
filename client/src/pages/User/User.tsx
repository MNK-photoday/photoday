import {
  S_UserPageContainer,
  S_UserSection,
  S_UserThumnailArea,
  S_UserInfoArea,
  S_UserPageTitle,
  S_UserPhotoContentBox,
  S_UserPhotoContent,
  S_Pagination,
} from './User.styles';
import { ContainerWrap } from '../../styles/Layout';
import oceanImage from '../../assets/imgs/image9.jpg';
import kungyaImage from '../../assets/imgs/kungyaImage.png';

function Users() {
  return (
    <ContainerWrap>
      <S_UserPageContainer>
        <S_UserSection>
          <S_UserThumnailArea>user thumnail</S_UserThumnailArea>
          <S_UserInfoArea>user info</S_UserInfoArea>
        </S_UserSection>
        <S_UserPageTitle>
          <h3>dkgus's photoday</h3>
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
        <S_Pagination>1 2 3 4 5 6</S_Pagination>
      </S_UserPageContainer>
    </ContainerWrap>
  );
}

export default Users;
