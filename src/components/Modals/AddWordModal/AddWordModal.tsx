import css from "./AddWordModal.module.css";

// import { type CreateNewWordRequest } from "../../../redux/types";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import Icon from "../../common/Icon";

type AddWordModalProps = {
  // word: CreateNewWordRequest;
  onClose: () => void;
  // onCreate: (createdData: CreateNewWordRequest) => void;
};

const AddWordModal = ({ onClose }: AddWordModalProps) => {
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
      </div>
    </ModalWrapper>
  );
};

export default AddWordModal;
