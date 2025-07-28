import css from "./UserLayou.module.css";

import { selectUser } from "../../../redux/auth/selectors";
import { useAppSelector } from "../../../redux/hooks";

const UserLayout = () => {
  const user = useAppSelector(selectUser);

  return (
    <div>
      <div>
        <span>{user?.name ? user.name[0].toUpperCase() : "U"}</span>
        <p className={css.fullName}>{user?.name ?? "User"}</p>
      </div>
    </div>
  );
};

export default UserLayout;
