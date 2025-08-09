import css from "./Dashboard.module.css";

import { Link } from "react-router-dom";
import Filters from "./Filters/Filters";
import Icon from "../common/Icon";

const Dashboard = () => {
  return (
    <section className={css.dashboardContainer}>
      <Filters />
      <div>
        <p>To study:</p>
        <span></span>
      </div>
      <div>
        <button>
          Add word <Icon className={css.iconPlus} iconName="plus" />
        </button>
        <Link to="/training">
          Train oneself <Icon className={css.iconArrow} iconName="arrow" />
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;
