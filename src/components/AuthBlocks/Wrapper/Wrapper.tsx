import type React from "react";
import css from "./Wrapper.module.css";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className={css.wrapperContainer}>
      <div className={css.banner}>
        <div className={css.picture}></div>
        <p className={css.text}>Word · Translation · Grammar · Progress</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Wrapper;
