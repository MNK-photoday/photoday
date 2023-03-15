import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { S_SelectBoxWrap, S_SelectSpan } from './SelectBox.style';
import SelectBoxModal from './SelectBoxModal';

function SelectBox() {
  const [isActiveSelect, setIsActiveSelect] = useState(false);
  return (
    <S_SelectBoxWrap onClick={() => setIsActiveSelect(!isActiveSelect)}>
      <S_SelectSpan>최신순</S_SelectSpan>
      {isActiveSelect ? (
        <BiChevronDown className="selectbox-icons" />
      ) : (
        <BiChevronUp className="selectbox-icons" />
      )}
      {isActiveSelect && <SelectBoxModal />}
    </S_SelectBoxWrap>
  );
}

export default SelectBox;
