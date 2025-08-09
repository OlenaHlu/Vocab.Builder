import css from "./Filters.module.css";
import { useState, useEffect } from "react";
import { getCategories } from "../../../redux/filters/operation";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectCategories,
  selectSelectedCategory,
  selectSearchQuery,
  selectVerbType,
} from "../../../redux/filters/selectors";
import { setCategory, setVerbType } from "../../../redux/filters/slice";
import Icon from "../../common/Icon";

const Filters = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const categories = useAppSelector(selectCategories);

  const selectedCategory = useAppSelector(selectSelectedCategory);
  const searchQuery = useAppSelector(selectSearchQuery);
  const verbType = useAppSelector(selectVerbType);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleCategory = (category: string) => {
    dispatch(setCategory(category));
    setIsOpen(false);
  };
  const toggleDropDown = () => setIsOpen((prev) => !prev);

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {};

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
            // onChange={handleSearch}
          />
          <Icon iconName="search" className={css.iconSearch} />
        </div>
        <button type="button" onClick={toggleDropDown}>
          {selectedCategory}
          <span>
            {isOpen ? (
              <Icon iconName="toggle" className={css.iconUp} />
            ) : (
              <Icon iconName="toggle" className={css.iconDown} />
            )}
          </span>
        </button>
        {isOpen && (
          <ul>
            {categories.map((category) => (
              <li
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

        {selectedCategory === "verb" && (
          <div>
            <label>
              <input
                type="radio"
                value="regular"
                checked={verbType === "regular"}
                onChange={handleVerbType}
              />{" "}
              Regular
            </label>
            <label>
              <input
                type="radio"
                value="irregular"
                checked={verbType === "irregular"}
                onChange={handleVerbType}
              />
              Irregular
            </label>
          </div>
        )}
      </form>
    </>
  );
};

export default Filters;
