import css from "./DeleteWordModal.module.css";

import ModalWrapper from "../ModalWrapper/ModalWrapper";

type DeleteWordModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteWordModal = ({ onClose, onConfirm }: DeleteWordModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className={css.modalContent}>
        <p className={css.text}>Are you sure you want to delete this word?</p>
        <div className={css.actions}>
          <button className={css.deleteBtn} onClick={onConfirm}>
            Delete
          </button>
          <button className={css.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteWordModal;
