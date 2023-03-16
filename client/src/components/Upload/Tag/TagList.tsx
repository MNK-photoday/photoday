import styled from 'styled-components';
import { RowFlex } from '../../../styles/GlobalStyles';
import TagItem from './TagItem';
import { Tags } from '../../../pages/Upload/Upload';

const TagListWrap = styled.div`
  ${RowFlex}
`;
type tagListProps = {
  tags: Tags[];
  onRemove: (id: number) => void;
};

function TagList({ tags, onRemove }: tagListProps) {
  return (
    <TagListWrap>
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} onRemove={onRemove} />
      ))}
    </TagListWrap>
  );
}

export default TagList;
