import { ContainerWrap } from '../../styles/Layout';
import SelectBox from '../../components/common/SelectBox/SelectBox';
import ImageCardList from '../../components/common/ImageCardList/ImageCardList';
import TagList from '../../components/Upload/Tag/TagList';
import {
  S_SearchBox,
  S_SearchContainer,
  S_SearchMenuBox,
  S_SelectContentBox,
  S_TagContentBox,
} from './Search.styles';

function Search() {
  /*임시 태그*/
  const TEST_TAGS = [
    { id: 1, name: '석양' },
    { id: 2, name: '풍경' },
    { id: 3, name: '나무' },
  ];

  return (
    <ContainerWrap>
      <S_SearchContainer>
        <S_SearchBox>
          <S_SearchMenuBox>
            <S_TagContentBox>
              <TagList tags={TEST_TAGS} />
            </S_TagContentBox>
            <S_SelectContentBox>
              <SelectBox />
            </S_SelectContentBox>
          </S_SearchMenuBox>
          <ImageCardList width={477} height={350} matrix="columns" />
        </S_SearchBox>
      </S_SearchContainer>
    </ContainerWrap>
  );
}

export default Search;
