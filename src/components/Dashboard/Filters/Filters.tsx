import css from "./Filters.module.css";
import { useState, useEffect } from "react";
import {
  getUserWords,
  getAllWords,
  getCategories,
} from "../../../redux/words/operations";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectCategories,
  selectSelectedCategory,
  selectVerbType,
  selectSearchQuery,
} from "../../../redux/words/selectors";
import {
  setCategory,
  setVerbType,
  setSearchQuery,
} from "../../../redux/words/slice";
import { type WordsRequestParams } from "../../../redux/types";
import Icon from "../../common/Icon";

type FiltersProps = {
  scope: "allWords" | "userWords";
};

const Filters = ({ scope }: FiltersProps) => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const verbType = useAppSelector(selectVerbType);
  const searchQuery = useAppSelector(selectSearchQuery);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCategory("all"));
    dispatch(setVerbType(""));
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const sanitized = searchQuery.trim();

      const params: WordsRequestParams = {};
      if (sanitized) params.keyword = sanitized;
      if (selectedCategory !== "all") params.category = selectedCategory;

      if (selectedCategory === "verb") {
        if (verbType === "irregular") params.isIrregular = true;
        if (verbType === "regular") params.isIrregular = false;
      }

      if (scope === "allWords") {
        dispatch(getAllWords(params));
      } else {
        dispatch(getUserWords(params));
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, selectedCategory, verbType, scope, dispatch]);

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
        <div className={css.inputBlock}>
          <input
            className={css.input}
            type="text"
            value={searchQuery}
            placeholder="Find the word"
            onChange={handleSearch}
          />
          <Icon iconName="search" className={css.iconSearch} />
        </div>
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
