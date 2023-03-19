import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { S_SelectBoxWrap, S_SelectSpan } from './SelectBox.style';
import SelectBoxModal from './SelectBoxModal';

function SelectBox() {
  const [isActiveSelect, setIsActiveSelect] = useState(false);
  const [isSelect, setIsSelect] = useState('Newest');

  return (
    <S_SelectBoxWrap onClick={() => setIsActiveSelect(!isActiveSelect)}>
      <S_SelectSpan>{isSelect}</S_SelectSpan>
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
