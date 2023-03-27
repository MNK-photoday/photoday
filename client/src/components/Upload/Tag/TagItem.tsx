import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { Flex } from '../../../styles/GlobalStyles';
import { Tags } from '../../../pages/Upload/Upload';

const TagItemWrap = styled.button<{ isModificationMode?: boolean }>`
  ${Flex}
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 9px 7px 7px;
  background-color: ${({ isModificationMode }) =>
    isModificationMode ? '#67cd92' : 'var(--color-primary-green)'};
  border: ${({ isModificationMode }) =>
    isModificationMode
      ? '1px solid #67cd92'
      : '1px solid var(--color-primary-green)'};
  color: #fff;
  border-radius: 40px;
  font-size: var(--font-size-sm);

  &:hover {
    background-color: var(--color-primary-green);
    color: #fff;
    border: 1px solid var(--color-primary-green);
    cursor: pointer;
    > .close-icon {
      display: ${({ isModificationMode }) =>
        isModificationMode ? 'block' : 'none'};
      color: #fff;
    }
  }
  .close-icon {
    display: none;
  }
`;

type TagItemProps = {
  tag: Tags;
  onRemove?: (id: number) => void;
  isModificationMode?: boolean;
};

function TagItem({ tag, onRemove, isModificationMode }: TagItemProps) {
  return (
    <TagItemWrap
      onClick={() => onRemove?.(tag.id)}
      isModificationMode={isModificationMode}
    >
      {tag.name} <IoClose className="close-icon" />
    </TagItemWrap>
  );
}

export default TagItem;
