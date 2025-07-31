import css from "./UserModal.module.css";

import Navigation from "../../Header/Navigation/Navigation";
import LogoutBtn from "../../Header/LogoutBtn/LogoutBtn";
import UserLayout from "../../Header/UserLayout/UserLayout";
import Icon from "../../common/Icon";

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const UserModal = ({ isOpen, onClose }: UserModalProps) => {
  return (
    <div className={`${css.userContainer} ${isOpen ? css.isOpen : ""}`}>
      <div className={css.userHeader}>
        <UserLayout isModal={true} />
        <button onClick={onClose} className={css.userBtn}>
          <Icon className={css.closeBtn} iconName="close" />
        </button>
      </div>
      <Navigation isModal={true} />
      <LogoutBtn isModal={true} />
    </div>
  );
};

export default UserModal;
