import { useController, useFormContext } from "react-hook-form";
import { InputErrorWarning } from "./errorMessage";

interface SelectControlProps {
  name: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
}

export const SelectControl: React.FC<SelectControlProps> = ({
  name,
  options,
  placeholder = "Select an option",
  disabled = false,
  className = "input-styles",
  wrapperClassName = "",
}) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value, ...fieldProps },
    fieldState: { error },
  } = useController({ name, control });

  // Kiểm tra xem value có tồn tại trong options không
  const isNumberSchema = typeof options[0]?.value === "number";
  const validValues = options.map((opt) => opt.value);
  const isValidValue = validValues.includes(value);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const finalValue = isNumberSchema ? Number(selectedValue) : selectedValue;
    onChange(finalValue);
  };

  return (
    <div className={`input-error-wrapper-style ${wrapperClassName}`}>
      <select
        {...fieldProps}
        value={isValidValue ? value : ""}
        onChange={handleChange}
        className={`${className} ${error ? "input-err-styles" : ""}`}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <InputErrorWarning errorMessage={error.message} />}
    </div>
  );
};
