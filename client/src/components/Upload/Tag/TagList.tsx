import styled from 'styled-components';
import { RowFlex } from '../../../styles/GlobalStyles';
import TagItem from './TagItem';
import { Tags } from '../../../pages/Upload/Upload';

const TagListWrap = styled.div`
  ${RowFlex}
  flex-wrap: wrap;
`;
type TagListProps = {
  tags: Tags[];
  onRemove?: (id: number) => void;
  isModificationMode?: boolean;
};

function TagList({ tags, onRemove, isModificationMode }: TagListProps) {
  return (
    <TagListWrap>
      {tags.map((tag) => (
        <TagItem
          key={tag.id}
          tag={tag}
          onRemove={onRemove}
          isModificationMode={isModificationMode}
        />
      ))}
    </TagListWrap>
  );
}

export default TagList;
