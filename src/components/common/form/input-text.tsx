"use client";

import { InputText, InputTextProps } from "primereact/inputtext";
import {
  FieldValues,
  RegisterOptions,
  Path,
  useFormContext,
  useController,
  Control,
} from "react-hook-form";
import { cn } from "@/util/funs";
import React from "react";

type RHFProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>; // <-- truyền vào đây
  wrapperClassName?: string;
  errorClassName?: string;
};

type InputTextControlProps<T extends FieldValues> = RHFProps<T> &
  Omit<InputTextProps, "name" | "value" | "onChange" | "onBlur" | "ref">;

export function InputTextControl<T extends FieldValues>({
  name,
  label,
  rules,
  wrapperClassName,
  errorClassName,
  ...inputProps
}: InputTextControlProps<T>) {
  const { control } = useFormContext() as { control: Control<T> };
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <div className={cn("flex flex-col gap-1", wrapperClassName)}>
      {label && (
        <label
          htmlFor={String(name)}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <InputText
        id={String(name)}
        {...inputProps}
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
        onBlur={field.onBlur}
        className={cn("w-full", { "p-invalid": !!error }, inputProps.className)}
      />
      {error && (
        <small className={cn("text-red-500 text-xs", errorClassName)}>
          {error.message}
        </small>
      )}
    </div>
  );
}
