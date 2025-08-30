import css from "./Filters.module.css";
import { useState, useEffect } from "react";
import { getCategories } from "../../../redux/filters/operation";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectCategories,
  selectSelectedCategory,
  selectVerbType,
} from "../../../redux/filters/selectors";
import { setCategory, setVerbType } from "../../../redux/filters/slice";
import Icon from "../../common/Icon";

const Filters = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const categories = useAppSelector(selectCategories);

  const selectedCategory = useAppSelector(selectSelectedCategory);
  const verbType = useAppSelector(selectVerbType);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCategory("all"));
    dispatch(setVerbType(""));
  }, [dispatch]);

  const handleCategory = (category: string) => {
    dispatch(setCategory(category));
    setIsOpen(false);
  };
  const toggleDropDown = () => setIsOpen((prev) => !prev);

  const handleVerbType = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setVerbType(e.target.value));
  };

  return (
    <>
      <form className={css.form}>
        <div className={css.filter}>
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
                onChange={handleVerbType}
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
                onChange={handleVerbType}
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
      </form>
    </>
  );
};

export default Filters;
