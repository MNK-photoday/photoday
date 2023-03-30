import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { Flex } from '../../../styles/GlobalStyles';
import { Tags } from '../../../pages/Upload/Upload';
import { useNavigate } from 'react-router-dom';

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
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-primary-green);
    color: #fff;
    border: 1px solid var(--color-primary-green);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
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
  const navigate = useNavigate();

  let searchtags: string = '';
  searchtags += tag['name'];

  const tagSearch = () => {
    if (isModificationMode === false) {
      navigate(`/tags/${searchtags}`);
    }
  };
  return (
    <TagItemWrap
      onClick={() => {
        onRemove?.(tag.id);
        tagSearch();
      }}
      isModificationMode={isModificationMode}
    >
      {tag.name} <IoClose className="close-icon" />
    </TagItemWrap>
  );
}

export default TagItem;
