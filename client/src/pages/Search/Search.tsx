import { Container, ContainerWrap } from '../../styles/Layout';
import SelectBox from '../../components/common/SelectBox/SelectBox';
import ImageCardList from '../../components/common/ImageCardList/ImageCardList';
import {
  S_ImageCardBox,
  S_SearchBox,
  S_SearchMenuBox,
  S_SelectContentBox,
  S_Tag,
  S_TagContentBox,
} from './Search.styled';
function Search() {
  return (
    <ContainerWrap>
      <Container>
        <S_SearchBox>
          <S_SearchMenuBox>
            <S_TagContentBox>
              {/*임시 태그*/}
              <S_Tag>나무</S_Tag>
              <S_Tag>나무 무늬</S_Tag>
              <S_Tag>나무 색</S_Tag>
            </S_TagContentBox>
            <S_SelectContentBox>
              <SelectBox />
            </S_SelectContentBox>
          </S_SearchMenuBox>
          <S_ImageCardBox>
            <ImageCardList />
          </S_ImageCardBox>
        </S_SearchBox>
      </Container>
    </ContainerWrap>
  );
}

export default Search;
