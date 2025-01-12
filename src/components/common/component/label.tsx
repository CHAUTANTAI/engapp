import { CSSProperties } from "react";

export interface LabelProps {
  label?: string;
  labelClassName?: string;
  additionalClassName?: string;
  labelStyles?: CSSProperties;
}

export const Label: React.FC<LabelProps> = ({
  labelClassName = "text-[black]",
  labelStyles,
  label,
  additionalClassName,
}) => {
  return (
    <div
      className={`${labelClassName} ${additionalClassName}`}
      style={labelStyles}
    >
      {label}
    </div>
  );
};
