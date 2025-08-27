import css from "./ActionsMenu.module.css";

import { useState, useRef, useEffect } from "react";
import Icon from "../../../common/Icon";

type ActionsMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const ActionsMenu = ({ onEdit, onDelete }: ActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.wrapper} ref={menuRef}>
      <button
        className={css.dotsBtn}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ...
      </button>
      {isOpen && (
        <div className={css.menu}>
          <button className={css.btn} onClick={onEdit}>
            <Icon iconName="edit" className={css.icon} /> Edit
          </button>
          <button className={css.btn} onClick={onDelete}>
            <Icon iconName="trash" className={css.icon} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionsMenu;
