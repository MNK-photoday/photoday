import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { Flex } from '../../../styles/GlobalStyles';
import { Tags } from '../../../pages/Upload/Upload';

const TagItemWrap = styled.button`
  ${Flex}
  margin-right: 5px;
  padding: 9px 7px 7px;
  background-color: #67cd92;
  border: 1px solid #67cd92;
  color: #fff;
  border-radius: 40px;
  font-size: var(--font-size-sm);

  &:hover {
    background-color: var(--color-primary-green);
    color: #fff;
    border: 1px solid var(--color-primary-green);
    cursor: pointer;
    > .close-icon {
      display: inline-block;
      color: #fff;
    }
  }
  .close-icon {
    display: none;
  }
`;

type tagProps = {
  tag: Tags;
  onRemove: (id: number) => void;
};

function TagItem({ tag, onRemove }: tagProps) {
  return (
    <TagItemWrap onClick={() => onRemove(tag.id)}>
      {tag.name} <IoClose className="close-icon" />
    </TagItemWrap>
  );
}

export default TagItem;
