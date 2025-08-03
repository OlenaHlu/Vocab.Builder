import css from "./Filters.module.css";
import { useEffect } from "react";
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
  const categories = useAppSelector(selectCategories);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const searchQuery = useAppSelector(selectSearchQuery);
  const verbType = useAppSelector(selectVerbType);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(e.target.value));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleVerbType = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setVerbType(e.target.value));
  };

  return (
    <>
      <form>
        <div>
          <input
            className={css.input}
            type="text"
            value={searchQuery}
            placeholder="Find the word"
            onChange={handleSearch}
          />
          <Icon iconName="search" className={css.iconSearch} />
        </div>
        <select value={selectedCategory} onChange={handleCategory}>
          <option value="all">Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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
