import css from "./EditWordModal.module.css";

import { type UserWord, type WordRequest } from "../../../redux/types";
import { editWordSchema } from "../../../utils/validation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import Icon from "../../common/Icon";

type EditWordModalProps = {
  word: UserWord;
  onClose: () => void;
  onSave: (updatedData: WordRequest) => Promise<void>;
};

const EditWordModal = ({ word, onClose, onSave }: EditWordModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div>
        <button onClick={onClose}>
          <Icon iconName="close" className={css.iconClose} />
        </button>

        <Formik
          initialValues={{
            en: word.en,
            ua: word.ua,
            category: word.category,
            isIrregular: word.isIrregular,
          }}
          validationSchema={editWordSchema}
          onSubmit={async (values) => {
            const updatedWord: WordRequest = {
              ...word,
              en: values.en,
              ua: values.ua,
            };
            await onSave(updatedWord);
          }}
        >
          {() => (
            <Form>
              <label>
                <Icon iconName="ua" className={css.iconFlag} /> Ukrainian
                <Field name="ua" />
                <ErrorMessage name="ua" component="div" className={css.error} />
              </label>
              <label>
                <Icon iconName="uk" className={css.iconFlag} /> English
                <Field name="en" />
                <ErrorMessage name="en" component="div" className={css.error} />
              </label>
              <div>
                <button type="submit" className={css.saveBtn}>
                  Save
                </button>
                <button
                  type="button"
                  className={css.cancelBtn}
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalWrapper>
  );
};

export default EditWordModal;
