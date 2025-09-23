import css from "./AddWordModal.module.css";

import ModalWrapper from "../ModalWrapper/ModalWrapper";
import Icon from "../../common/Icon";
import AddWordForm from "./AddWordForm/AddWordForm";
import { type WordRequest } from "../../../redux/types";

type AddWordModalProps = {
  onClose: () => void;
  onCreate: (newWord: WordRequest) => void;
};

const AddWordModal = ({ onClose, onCreate }: AddWordModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className={css.addWordModal}>
        <button className={css.closeBtn} onClick={onClose}>
          <Icon iconName="close" className={css.iconClose} />
        </button>
        <div className={css.modalInfo}>
          <h2 className={css.modalTitle}>Add word</h2>
          <p className={css.modalText}>
            Adding a new word to the dictionary is an important step in
            enriching the language base and expanding the vocabulary.
          </p>
        </div>
        <AddWordForm onCancel={onClose} onSuccess={onCreate} />
      </div>
    </ModalWrapper>
  );
};

export default AddWordModal;
