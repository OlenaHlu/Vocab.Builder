import css from "./Header.module.css";

import Icon from "../common/Icon";
import Navigation from "./Navigation/Navigation";
import UserLayout from "./UserLayout/UserLayout";

const Header = () => {
  return (
    <header className={css.headerContainer}>
      <div className={css.header}>
        <div className={css.logo}>
          <Icon iconName="logo" className={css.icon} />
          <p className={css.text}>VocabBuilder</p>
        </div>
        <Navigation />
        <div className={css.userLayout}>
          <UserLayout />
          <button type="submit">
            Log out
            <Icon className={css.iconEdit} iconName="switch-1" />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
