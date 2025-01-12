import { CSSProperties, InputHTMLAttributes } from "react";
import { Label, LabelProps } from "../component/label";
import { useController, useFormContext } from "react-hook-form";
import { InputErrorWarning } from "./errorMessage";

interface UnControlCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  styles?: CSSProperties;
  labelProps?: LabelProps;
  disable?: boolean;
  readonly?: boolean;
  required?: boolean;
  wrapperClassName?: string;
  wrapperStyles?: CSSProperties;
  additionalClassName?: string;
}
interface CheckboxProps extends UnControlCheckboxProps {
  controlProps: CheckboxControlProps;
}

interface CheckboxControlProps {
  name: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className = "input-checkbox-styles",
  styles,
  labelProps,
  wrapperClassName = "",
  additionalClassName = "",
  wrapperStyles,
  controlProps,
  ...inputProps
}) => {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({ name: controlProps.name, control: control });
  return (
    <div className={wrapperClassName} style={wrapperStyles}>
      <div className="flex flex-row items-center justify-center w-max gap-x-2">
        <input
          type="checkbox"
          className={`${className} ${additionalClassName}`}
          style={styles}
          {...field}
          {...inputProps}
        />
        {labelProps && <Label {...labelProps}></Label>}
        {error && <InputErrorWarning errorMessage={error.message} />}
      </div>
    </div>
  );
};

export const UnControlCheckbox: React.FC<UnControlCheckboxProps> = ({
  className = "",
  styles,
  labelProps,
  wrapperClassName = "",
  wrapperStyles,
  additionalClassName = "",
}) => {
  return (
    <div className={wrapperClassName} style={wrapperStyles}>
      <input
        type="checkbox"
        className={`${className} ${additionalClassName}`}
        style={styles}
      />
      {labelProps && <Label {...labelProps}></Label>}
    </div>
  );
};
