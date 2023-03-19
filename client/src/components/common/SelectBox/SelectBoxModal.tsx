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
  return (
    <S_SelectModalWrap>
      <S_SelectModalContainer>
        <S_SelectModalSpan
          onClick={() => setIsSelect('최신순')}
          active={isSelect === '최신순'}
        >
          최신순
        </S_SelectModalSpan>
        <S_SelectModalSpan
          onClick={() => setIsSelect('인기순')}
          active={isSelect === '인기순'}
        >
          인기순
        </S_SelectModalSpan>
      </S_SelectModalContainer>
    </S_SelectModalWrap>
  );
}

export default SelectBoxModal;
