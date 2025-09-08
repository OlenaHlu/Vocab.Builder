import css from "./Dashboard.module.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectWordsToStudy } from "../../redux/words/selectors";
import { getStatistics } from "../../redux/words/operations";
import { setSearchQuery } from "../../redux/words/slice";
import { useLocation } from "react-router-dom";
import Filters from "./Filters/Filters";
import Icon from "../common/Icon";
import AddWordModal from "../Modals/AddWordModal/AddWordModal";

const Dashboard = () => {
  const wordsToStudy = useAppSelector(selectWordsToStudy);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const showAddWordBtn = location.pathname === "/dictionary";
  const dispatch = useAppDispatch();

  const scope: "allWords" | "userWords" =
    location.pathname === "/dictionary" ? "userWords" : "allWords";

  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);

  const handleModalSuccess = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={css.dashboardContainer}>
      <Filters scope={scope} />
      <div className={css.allAction}>
        <div className={css.toStudy}>
          <p className={css.textStady}>To study:</p>
          <span className={css.quantity}>{wordsToStudy}</span>
        </div>
        <div className={css.actionContainer}>
          {showAddWordBtn && (
            <>
              <div className={css.addWord}>
                <p className={css.textAdd}>Add word</p>
                <button
                  className={css.addBtn}
                  onClick={() => setIsModalOpen(true)}
                >
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

          <div className={css.train}>
            <p className={css.textTrain}>Train oneself</p>
            <Link to="/training">
              <Icon className={css.iconArrow} iconName="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
