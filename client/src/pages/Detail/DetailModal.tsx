import {
  S_DetailModalContainer,
  S_ModalDeleteButton,
  S_ModalReportButton,
} from './DetailModal.styles';

type ModalProps = {
  isMyImage: boolean;
  adminCheck: boolean | undefined;
  deleteHandler: () => void;
  reportHandler: () => void;
};

function DetailModal({
  isMyImage,
  deleteHandler,
  reportHandler,
  adminCheck,
}: ModalProps) {
  return (
    <S_DetailModalContainer>
      {!isMyImage ? (
        <S_ModalReportButton onClick={reportHandler}>
          Report
        </S_ModalReportButton>
      ) : null}
      {isMyImage || adminCheck ? (
        <S_ModalDeleteButton onClick={deleteHandler}>
          Delete
        </S_ModalDeleteButton>
      ) : null}
    </S_DetailModalContainer>
  );
}

export default DetailModal;
