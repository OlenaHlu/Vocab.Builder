import { toast, Bounce } from "react-toastify";

type ShowToastProps = {
  message: string;
  type: "success" | "error";
};

const ShowToast = ({ message, type }: ShowToastProps): void => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: type === "success" ? "light" : "colored",
    transition: Bounce,
  });
};

export default ShowToast;
