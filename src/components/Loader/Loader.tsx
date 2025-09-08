import { RingLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <RingLoader size={60} color="#85aa9f" />
    </div>
  );
};

export default Loader;
