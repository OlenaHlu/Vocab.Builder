import css from "./Dashboard.module.css";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import {
  selectUserWords,
  selectWordsIsLoading,
  selectWordsError,
} from "../../redux/words/selectors";
import { getUserWords } from "../../redux/words/operations";
import Filters from "./Filters/Filters";
import WordsTable from "../WordsTable/WordsTable";
import Icon from "../common/Icon";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectUserWords);
  const isLoading = useAppSelector(selectWordsIsLoading);
  const error = useAppSelector(selectWordsError);

  useEffect(() => {
    dispatch(getUserWords());
  }, [dispatch]);

  return (
    <section className={css.dashboardContainer}>
      <Filters />
      <div>
        <p>To study:</p>
        <span>{words.length}</span>
      </div>
      <div>
        <div>
          <p>Add word</p>
          <button>
            <Icon className={css.iconPlus} iconName="plus" />
          </button>
        </div>
        <div>
          <p>Train oneself </p>
          <Link to="/training">
            <Icon className={css.iconArrow} iconName="arrow" />
          </Link>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to load words: {error}</p>}
      {!isLoading && !error && words.length === 0 && (
        <p>You have no own words yet</p>
      )}
      {!isLoading && !error && words.length > 0 && <WordsTable words={words} />}
    </section>
  );
};

export default Dashboard;
