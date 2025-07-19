import css from "./Header.module.css";

import Icon from "../common/Icon";

const Header = () => {
  return (
    <header className={css.headerContainer}>
      <div className={css.header}>
        <div className={css.logo}>
          <Icon iconName="logo" className={css.icon} />
          <p className={css.text}>VocabBuilder</p>
        </div>
      </div>
    </header>
  );
};
export default Header;
