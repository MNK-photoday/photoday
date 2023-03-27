import {
  S_DetailModalContainer,
  S_ModalDeleteButton,
  S_ModalReportButton,
} from './DetailModal.styles';

type ModalProps = {
  isMyImage: boolean;
};

function DetailModal({ isMyImage }: ModalProps) {
  return (
    <S_DetailModalContainer>
      <S_ModalReportButton>Report</S_ModalReportButton>
      {isMyImage && <S_ModalDeleteButton>Delete</S_ModalDeleteButton>}
    </S_DetailModalContainer>
  );
}

export default DetailModal;
