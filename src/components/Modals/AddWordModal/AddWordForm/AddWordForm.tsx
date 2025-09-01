import css from "./AddWordForm.module.css";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { createNewWord } from "../../../../redux/words/operations";
import { selectCategories } from "../../../../redux/filters/selectors";
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
            <div>
              <button
                className={css.categoriesBtn}
                type="button"
                onClick={toggleDropDown}
              >
                {selectedCategory === "all" ? "Categories" : selectedCategory}

                <span>
                  {isOpen ? (
                    <Icon iconName="down" className={css.iconUp} />
                  ) : (
                    <Icon iconName="down" className={css.iconDown} />
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
                    <Icon className={css.radioIcon} iconName="radio-btn-full" />
                  ) : (
                    <Icon
                      className={`${css.radioIcon} ${css.off}`}
                      iconName="radio-btn"
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
                    <Icon className={css.radioIcon} iconName="radio-btn-full" />
                  ) : (
                    <Icon
                      className={`${css.radioIcon} ${css.off}`}
                      iconName="radio-btn"
                    />
                  )}
                  Irregular
                </label>
              </div>
            )}
            <div>
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
            </div>
            <div>
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
