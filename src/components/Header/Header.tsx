import css from "./Header.module.css";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Icon from "../common/Icon";
import Navigation from "./Navigation/Navigation";
import UserLayout from "./UserLayout/UserLayout";
import { signOut } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/login");
    toast.success("Sign out success");
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
              <button type="button" className={css.burgerBtn}>
                <Icon className={css.burger} iconName="burger" />
              </button>
              <button
                type="button"
                className={css.logoutBtn}
                onClick={handleLogout}
              >
                Log out <Icon className={css.iconEdit} iconName="arrow" />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
