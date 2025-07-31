import css from "./UserLayou.module.css";

import { selectUser } from "../../../redux/auth/selectors";
import { useAppSelector } from "../../../redux/hooks";
import Icon from "../../common/Icon";

type UserLayoutProps = {
  isModal?: boolean;
};

const UserLayout = ({ isModal = false }: UserLayoutProps) => {
  const user = useAppSelector(selectUser);

  return (
    <div className={css.userContainer}>
      <p className={`${css.name} ${isModal ? css.nameModal : ""}`}>
        {user?.name ?? "User"}
      </p>
      <span className={`${css.user} ${isModal ? css.userModal : ""}`}>
        {isModal ? (
          <Icon className={css.iconUserModal} iconName="user-full" />
        ) : (
          <Icon className={css.iconUser} iconName="user" />
        )}
      </span>
    </div>
  );
};

export default UserLayout;
