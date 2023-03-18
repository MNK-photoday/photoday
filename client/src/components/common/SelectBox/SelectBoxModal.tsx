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
          onClick={() => setIsSelect('Newest')}
          active={isSelect === 'Newest'}
        >
          Newest
        </S_SelectModalSpan>
        <S_SelectModalSpan
          onClick={() => setIsSelect('Popular')}
          active={isSelect === 'Popular'}
        >
          Popular
        </S_SelectModalSpan>
      </S_SelectModalContainer>
    </S_SelectModalWrap>
  );
}

export default SelectBoxModal;
