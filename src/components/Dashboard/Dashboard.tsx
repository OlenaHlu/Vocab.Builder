import css from "./Dashboard.module.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectSearchQuery } from "../../redux/filters/selectors";
import { selectWordsToStudy } from "../../redux/words/selectors";
import { getStatistics } from "../../redux/words/operations";
import { setSearchQuery } from "../../redux/filters/slice";
import { useLocation } from "react-router-dom";
import Filters from "./Filters/Filters";
import Icon from "../common/Icon";
import AddWordModal from "../Modals/AddWordModal/AddWordModal";

const Dashboard = () => {
  const wordsToStudy = useAppSelector(selectWordsToStudy);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const showAddWordBtn = location.pathname === "/dictionary";
  const searchQuery = useAppSelector(selectSearchQuery);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleModalSuccess = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={css.dashboardContainer}>
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
      <Filters />
      <div>
        <p>To study:</p>
        <span>{wordsToStudy}</span>
      </div>
      <div>
        {showAddWordBtn && (
          <>
            <div>
              <p>Add word</p>
              <button onClick={() => setIsModalOpen(true)}>
                <Icon className={css.iconPlus} iconName="plus" />
              </button>
            </div>
            {isModalOpen && (
              <AddWordModal
                onClose={() => setIsModalOpen(false)}
                onCreate={handleModalSuccess}
              />
            )}
          </>
        )}

        <div>
          <p>Train oneself</p>
          <Link to="/training">
            <Icon className={css.iconArrow} iconName="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
