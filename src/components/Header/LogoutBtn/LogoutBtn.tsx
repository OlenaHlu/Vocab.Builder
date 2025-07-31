import css from "./LogoutBtn.module.css";

import { useNavigate } from "react-router-dom";
import { signOut } from "../../../redux/auth/operations";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../redux/hooks";
import Icon from "../../common/Icon";

type LogoutBtnProps = {
  isModal?: boolean;
};

const LogoutBtn = ({ isModal = false }: LogoutBtnProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/login");
    toast.success("Sign out success");
  };

  return (
    <button
      className={`${css.logoutBtn} ${isModal ? css.logoutBtnModal : ""}`}
      onClick={handleLogout}
      type="button"
    >
      Log Out
      <Icon className={css.icon} iconName="arrow" />
    </button>
  );
};

export default LogoutBtn;
