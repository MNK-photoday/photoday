import styled from 'styled-components';
import { RowFlex } from '../../../styles/GlobalStyles';
import TagItem from './TagItem';
import { Tags } from '../../../pages/Upload/Upload';

const TagListWrap = styled.div`
  ${RowFlex}
  width: 500px;
  flex-wrap: wrap;
`;
type TagListProps = {
  tags: Tags[];
  onRemove?: (id: number) => void;
};

function TagList({ tags, onRemove }: TagListProps) {
  return (
    <TagListWrap>
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} onRemove={onRemove} />
      ))}
    </TagListWrap>
  );
}

export default TagList;
