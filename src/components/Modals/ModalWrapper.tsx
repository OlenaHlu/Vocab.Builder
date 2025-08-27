import { useEffect } from "react";

type ModalWrapperProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const ModalWrapper = ({ onClose, children }: ModalWrapperProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div onClick={handleBackdrop}>
      <div>{children}</div>
    </div>
  );
};

export default ModalWrapper;
