import { useController, useFormContext } from "react-hook-form";
import { Icon } from "../../icon/icon";
import { InputErrorWarning } from "../errorMessage";
import { useEffect, useState } from "react";

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
  additionalClassName?: string;
  wrapperClassName?: string;
}

export const InputControl: React.FC<InputControlProps> = ({
  name,
  type = "text",
  placeholder = "",
  required = false,
  minLength,
  maxLength,
  readonly,
  disable,
  className = "input-styles",
  wrapperClassName = "",
  additionalClassName = "",
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  const intputClassName =
    error && required ? `${className} input-err-styles` : className;
  //State
  const [init, setInit] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "password" && e.key === " ") {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (type === "password") {
      const pastedText = e.clipboardData.getData("text");
      if (/\s/.test(pastedText)) {
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    if (init === true && field.value) {
      setInit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);
  return (
    <div className="input-error-wrapper-style">
      <div className={`input-wrapper-styles ${wrapperClassName}`}>
        <input
          {...field}
          id={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          disabled={disable}
          readOnly={readonly}
          maxLength={maxLength}
          minLength={minLength}
          className={`${intputClassName} ${additionalClassName}`}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
        {type !== "password" && required && !error && !init && (
          <Icon name="check" wrapperClassName={"icon-input-styles"}></Icon>
        )}
        {type === "password" && (
          <Icon
            name={showPassword ? "eye" : "eyeSlash"}
            wrapperClassName="icon-input-styles"
            onClickWrapper={togglePasswordVisibility}
          />
        )}
      </div>
      {error && <InputErrorWarning errorMessage={error.message} />}
    </div>
  );
};
