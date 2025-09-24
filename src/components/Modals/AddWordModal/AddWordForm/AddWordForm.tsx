import css from "./AddWordForm.module.css";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { createNewWord } from "../../../../redux/words/operations";
import { selectCategories } from "../../../../redux/words/selectors";
import { createWordSchema } from "../../../../utils/validation";
import { type WordRequest } from "../../../../redux/types";
import Icon from "../../../common/Icon";
import ShowToast from "../../../common/ShowToast";

type AddWordFormProps = {
  onCancel: () => void;
  onSuccess: (newWord: WordRequest) => void;
};

const AddWordForm = ({ onCancel, onSuccess }: AddWordFormProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [isOpen, setIsOpen] = useState(false);

  const initialValues: WordRequest = {
    ua: "",
    en: "",
    category: "all",
    isIrregular: false,
  };

  const handleSubmit = async (values: WordRequest) => {
    try {
      const payload: WordRequest = {
        en: values.en,
        ua: values.ua,
        category: values.category,
        ...(values.category === "verb"
          ? { isIrregular: values.isIrregular }
          : {}),
      };

      await dispatch(createNewWord(payload)).unwrap();
      ShowToast({ message: "Word successfully added!", type: "success" });
      onSuccess(payload);
    } catch (error: any) {
      const errorMessage = error.message || "Something went wrong";
      ShowToast({ message: errorMessage, type: "error" });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createWordSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        const selectedCategory = values.category;
        const verbType = values.isIrregular ? "irregular" : "regular";

        const toggleDropDown = () => setIsOpen((prev) => !prev);

        const handleCategory = (category: string) => {
          setFieldValue("category", category);
          if (category !== "verb") setFieldValue("isIrregular", false);
          setIsOpen(false);
        };

        const handleVerbType = (type: "regular" | "irregular") => {
          setFieldValue("isIrregular", type === "irregular");
        };
        return (
          <Form>
            <div className={css.catWithVerb}>
              <div className={css.categoriesContainer}>
                <button
                  className={css.categoriesBtn}
                  type="button"
                  onClick={toggleDropDown}
                >
                  {selectedCategory === "all" ? "Categories" : selectedCategory}

                  <span>
                    {isOpen ? (
                      <Icon iconName="down-md" className={css.iconUp} />
                    ) : (
                      <Icon iconName="down-md" className={css.iconDown} />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <ul className={css.categoriesList}>
                    {categories.map((category) => (
                      <li
                        className={`${css.categoryItem} ${
                          selectedCategory === category ? css.active : ""
                        }`}
                        key={category}
                        onClick={() => {
                          handleCategory(category);
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {selectedCategory === "verb" && (
                <div className={css.verbsContainer}>
                  <label className={css.labelRadio}>
                    <input
                      className={css.inputRadio}
                      type="radio"
                      value="regular"
                      checked={verbType === "regular"}
                      onChange={() => handleVerbType("regular")}
                    />
                    {verbType === "regular" ? (
                      <Icon
                        className={css.radioIcon}
                        iconName="radio-btn-full-md"
                      />
                    ) : (
                      <Icon
                        className={`${css.radioIcon} ${css.off}`}
                        iconName="radio-btn-md"
                      />
                    )}
                    Regular
                  </label>
                  <label className={css.labelRadio}>
                    <input
                      className={css.inputRadio}
                      type="radio"
                      value="irregular"
                      checked={verbType === "irregular"}
                      onChange={() => handleVerbType("irregular")}
                    />
                    {verbType === "irregular" ? (
                      <Icon
                        className={css.radioIcon}
                        iconName="radio-btn-full-md"
                      />
                    ) : (
                      <Icon
                        className={`${css.radioIcon} ${css.off}`}
                        iconName="radio-btn-md"
                      />
                    )}
                    Irregular
                  </label>
                </div>
              )}
            </div>
            <div className={css.formsContainer}>
              <label className={css.formLabel}>
                <div className={css.inputInfo}>
                  <Icon iconName="ua" className={css.iconFlag} />
                  <p className={css.langText}>Ukrainian</p>
                </div>
                <div>
                  <Field name="ua" type="text" className={css.input} />
                  <ErrorMessage
                    name="ua"
                    component="div"
                    className={css.error}
                  />
                </div>
              </label>
              <label className={css.formLabel}>
                <div className={css.inputInfo}>
                  <Icon iconName="uk" className={css.iconFlag} />
                  <p className={css.langText}>English</p>
                </div>
                <div>
                  <Field name="en" type="text" className={css.input} />
                  <ErrorMessage
                    name="en"
                    component="div"
                    className={css.error}
                  />
                </div>
              </label>
            </div>
            <div className={css.actionBtns}>
              <button type="submit" className={css.saveBtn}>
                Add
              </button>
              <button
                type="button"
                className={css.cancelBtn}
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddWordForm;
