import css from "./Dashboard.module.css";

import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

import { selectUserWords } from "../../redux/words/selectors";
import Filters from "./Filters/Filters";
import Icon from "../common/Icon";

const Dashboard = () => {
  const words = useAppSelector(selectUserWords);

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
    </section>
  );
};

export default Dashboard;
