import {
  S_DetailModalContainer,
  S_ModalDeleteButton,
  S_ModalReportButton,
} from './DetailModal.styles';

function DetailModal() {
  return (
    <S_DetailModalContainer>
      <S_ModalReportButton>Report</S_ModalReportButton>
      <S_ModalDeleteButton>Delete</S_ModalDeleteButton>
    </S_DetailModalContainer>
  );
}

export default DetailModal;
