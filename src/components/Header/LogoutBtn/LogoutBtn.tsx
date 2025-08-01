import css from "./LogoutBtn.module.css";

import { useNavigate } from "react-router-dom";
import { signOut } from "../../../redux/auth/operations";
import { useAppDispatch } from "../../../redux/hooks";
import Icon from "../../common/Icon";
import ShowToast from "../../common/ShowToast";

type LogoutBtnProps = {
  isModal?: boolean;
};

const LogoutBtn = ({ isModal = false }: LogoutBtnProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(signOut());
      navigate("/login");
      ShowToast({ message: "Sign out success", type: "success" });
    } catch (error: any) {
      console.error("Sign out failed:", error);
      const errorMessage = error?.message || "Something went wrong.";
      ShowToast({ message: errorMessage, type: "error" });
    }
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
