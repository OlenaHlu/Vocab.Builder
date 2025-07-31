import css from "./Navigation.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

type NavigationProps = {
  isModal?: boolean;
};

const Navigation = ({ isModal = false }: NavigationProps) => {
  function getClassActiveLink({ isActive }: { isActive: boolean }) {
    return clsx(css.link, isActive && css.isActive);
  }
  return (
    <nav className={`${css.navContainer} ${isModal ? css.navModal : ""}`}>
      <ul className={`${css.navList} ${isModal ? css.listModal : ""}`}>
        <li>
          <NavLink className={getClassActiveLink} to="/dictionary">
            Dictionary
          </NavLink>
        </li>
        <li>
          <NavLink className={getClassActiveLink} to="/recommend">
            Recommend
          </NavLink>
        </li>
        <li>
          <NavLink className={getClassActiveLink} to="/training">
            Training
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
