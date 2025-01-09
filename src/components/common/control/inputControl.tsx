import { useController, useFormContext } from "react-hook-form";

interface InputControlProps {
  name: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  readonly?: boolean;
  disable?: boolean;
  className?: string;
}

const InputErrorWarning = (errorMessage?: string) => {
  return <span className="text-red-500 text-sm">{errorMessage}</span>;
};

export const InputControl: React.FC<InputControlProps> = ({
  name,
  type = "text",
  placeholder = "",
  required = false,
  minLength,
  maxLength,
  readonly,
  disable,
  className,
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  console.log(required);
  return (
    <>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disable}
        readOnly={readonly}
        maxLength={maxLength}
        minLength={minLength}
        className={`${className}`}
        {...field}
      />
      {error && InputErrorWarning(error.message)}
    </>
  );
};
