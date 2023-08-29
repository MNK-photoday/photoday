import { useContext } from 'react';
import { ImageContext } from '../../../context/ImageContext';
import { PageNumContext } from '../../../context/PageNumContext';
import {
  S_SelectModalWrap,
  S_SelectModalContainer,
  S_SelectModalSpan,
} from './SelectBoxModal.style';

interface SelectBoxProps {
  isSelect: string;
  setIsSelect: (isSelect: string) => void;
}
function SelectBoxModal({ isSelect, setIsSelect }: SelectBoxProps) {
  const IMAGE_CONTEXT = useContext(ImageContext);
  const PAGE_NUM_CONTEXT = useContext(PageNumContext);

  const selectfilter = (type: string) => {
    if (isSelect !== type) {
      IMAGE_CONTEXT?.setItems([]);
      PAGE_NUM_CONTEXT?.setPageNumber(1);
      setIsSelect(type);
    }
  };

  return (
    <S_SelectModalWrap>
      <S_SelectModalContainer>
        <S_SelectModalSpan
          onClick={() => selectfilter('createdAt')}
          active={isSelect === 'createdAt'}
        >
          Newest
        </S_SelectModalSpan>
        <S_SelectModalSpan
          onClick={() => selectfilter('viewCount')}
          active={isSelect === 'viewCount'}
        >
          Popular
        </S_SelectModalSpan>
      </S_SelectModalContainer>
    </S_SelectModalWrap>
  );
}

export default SelectBoxModal;
