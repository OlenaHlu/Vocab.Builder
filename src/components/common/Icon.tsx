import symbols from "../../assets/symbol-defs.svg";

type IconProps = {
  iconName: string;
  className: string;
};

const Icon = ({ iconName, className }: IconProps) => {
  return (
    <svg className={className}>
      <use href={`${symbols}#icon-${iconName}`} />
    </svg>
  );
};

export default Icon;
