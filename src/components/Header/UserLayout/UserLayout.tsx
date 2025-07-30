import css from "./UserLayou.module.css";

import { selectUser } from "../../../redux/auth/selectors";
import { useAppSelector } from "../../../redux/hooks";
import Icon from "../../common/Icon";

const UserLayout = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className={css.userContainer}>
      <p className={css.fullName}>{user?.name ?? "User"}</p>
      <span className={css.user}>
        <Icon className={css.iconUser} iconName="user" />
      </span>
    </div>
  );
};

export default UserLayout;
