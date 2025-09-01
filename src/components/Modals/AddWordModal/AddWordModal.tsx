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
      <div>
        <button onClick={onClose}>
          <Icon iconName="close" className={css.iconClose} />
        </button>
        <h2>Add word</h2>
        <p>
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </p>
        <AddWordForm onCancel={onClose} onSuccess={onCreate} />
      </div>
    </ModalWrapper>
  );
};

export default AddWordModal;
