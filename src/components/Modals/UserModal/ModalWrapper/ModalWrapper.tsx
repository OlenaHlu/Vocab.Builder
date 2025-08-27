import css from "./ModalWrapper.module.css";

import { useCallback, useEffect, useState } from "react";

type ModalWrapperProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const ModalWrapper = ({ onClose, children }: ModalWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div
      className={`${css.backdrop} ${isVisible ? css.show : ""}`}
      onClick={handleBackdrop}
    >
      <div className={css.content}>{children}</div>
    </div>
  );
};

export default ModalWrapper;
