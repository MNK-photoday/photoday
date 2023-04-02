import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { S_SelectBoxWrap, S_SelectSpan } from './SelectBox.style';
import SelectBoxModal from './SelectBoxModal';

export type SelectBoxProps = {
  isSelect: string;
  setIsSelect: React.Dispatch<React.SetStateAction<string>>;
};

function SelectBox({ isSelect, setIsSelect }: SelectBoxProps) {
  const [isActiveSelect, setIsActiveSelect] = useState(false);

  return (
    <S_SelectBoxWrap onClick={() => setIsActiveSelect(!isActiveSelect)}>
      <S_SelectSpan>
        {isSelect === 'createdAt' ? 'Newest' : 'Popular'}
      </S_SelectSpan>
      {isActiveSelect ? (
        <BiChevronUp className="selectbox-icons" />
      ) : (
        <BiChevronDown className="selectbox-icons" />
      )}
      {isActiveSelect && (
        <SelectBoxModal isSelect={isSelect} setIsSelect={setIsSelect} />
      )}
    </S_SelectBoxWrap>
  );
}

export default SelectBox;
