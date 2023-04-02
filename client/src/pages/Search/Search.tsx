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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Tags = {
  id: number;
  name: string;
};

function Search() {
  const [isSelect, setIsSelect] = useState('createdAt');
  const [isTags, setIsTags] = useState<Tags[]>([]);
  const { search } = useParams();

  useEffect(() => {
    const tags = search?.split(' ') ?? [''];
    setIsTags(tags.map((tag, index) => ({ id: index + 1, name: tag })));
  }, [search]);

  return (
    <ContainerWrap>
      <S_SearchContainer>
        <S_SearchBox>
          <S_SearchMenuBox>
            <S_TagContentBox>
              <TagList tags={isTags} />
            </S_TagContentBox>
            <S_SelectContentBox>
              <SelectBox isSelect={isSelect} setIsSelect={setIsSelect} />
            </S_SelectContentBox>
          </S_SearchMenuBox>
          <ImageCardList
            width={477}
            height={320}
            matrix="columns"
            filter={isSelect}
          />
        </S_SearchBox>
      </S_SearchContainer>
    </ContainerWrap>
  );
}

export default Search;
