import css from "./Header.module.css";

import { useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useState } from "react";
import Icon from "../common/Icon";
import Navigation from "./Navigation/Navigation";
import UserLayout from "./UserLayout/UserLayout";
import UserModal from "../Modals/UserModal/UserModal";

import LogoutBtn from "./LogoutBtn/LogoutBtn";

const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openMenu = () => {
    setIsModalOpen(true);
  };

  const closeMenu = () => {
    setIsModalOpen(false);
  };

  return (
    <header className={css.headerContainer}>
      <div className={css.header}>
        <div className={css.logo}>
          <Icon iconName="logo" className={css.icon} />
          <p className={css.text}>VocabBuilder</p>
        </div>
        {isLoggedIn && (
          <>
            <Navigation />
            <div className={css.userLayout}>
              <UserLayout />
              <button
                type="button"
                className={css.burgerBtn}
                onClick={openMenu}
              >
                <Icon className={css.burger} iconName="burger" />
              </button>
              <LogoutBtn />
            </div>
          </>
        )}
      </div>

      <div
        className={`${css.backdrop} ${isModalOpen ? css.isOpen : ""}`}
        onClick={closeMenu}
      />

      <UserModal isOpen={isModalOpen} onClose={closeMenu} />
    </header>
  );
};
export default Header;
