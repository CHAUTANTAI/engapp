import { useController, useFormContext } from "react-hook-form";
import { InputErrorWarning } from "./errorMessage";

interface CheckboxGroupControlProps {
  name: string;
  options: { value: number; label: string }[];
  flexMode?: "flex-wrap" | "flex-col" | "flex-row";
}

export const CheckboxGroupControl: React.FC<CheckboxGroupControlProps> = ({
  name,
  options,
  flexMode = "flex-wrap",
}) => {
  const { control } = useFormContext();
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleToggle = (selectedValue: number) => {
    const updatedValues = value.includes(selectedValue)
      ? value.filter((val: number) => val !== selectedValue)
      : [...value, selectedValue];
    onChange(updatedValues);
  };

  return (
    <div>
      <div className={`flex gap-2 ${flexMode}`}>
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              className="input-checkbox-styles"
              type="checkbox"
              value={option.value}
              checked={value.includes(option.value)}
              onChange={() => handleToggle(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <InputErrorWarning errorMessage={error.message} />}{" "}
    </div>
  );
};
