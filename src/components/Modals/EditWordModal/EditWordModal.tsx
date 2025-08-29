import css from "./EditWordModal.module.css";

import { type UserWord } from "../../../redux/types";
import { editWordSchema } from "../../../utils/validation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import ShowToast from "../../common/ShowToast";
import Icon from "../../common/Icon";

type EditWordModalProps = {
  word: UserWord;
  onClose: () => void;
  onSave: (updatedData: { en: string; ua: string }) => void;
};

const EditWordModal = ({ word, onClose, onSave }: EditWordModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div>
        <button onClick={onClose}>
          <Icon iconName="close" className={css.iconClose} />
        </button>

        <Formik
          initialValues={{ en: word.en, ua: word.ua }}
          validationSchema={editWordSchema}
          onSubmit={(values) => {
            onSave(values);
            ShowToast({
              message: "Word updated successfully",
              type: "success",
            });
            onClose();
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
