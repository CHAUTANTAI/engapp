interface ButtonProps {
  type: "button" | "submit";
  value?: string;
  className?: string;
  additionalClassName?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  additionalClassName = "",
  className = "button-styles",
  value = "Button",
  onClick,
}) => {
  return (
    <input
      type={type}
      onClick={onClick}
      className={`${className} ${additionalClassName}`}
      value={value}
    />
  );
};
