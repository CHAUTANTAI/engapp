"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Field = {
  name: string; // Đảm bảo name là string
  label: string;
  type: string;
};

type FormWrapperProps = {
  fields: Field[];
  onSubmit: (data: Record<string, string>) => void;
};

const FormWrapper: React.FC<FormWrapperProps> = ({ fields, onSubmit }) => {
  const { register, handleSubmit } = useForm<Record<string, string>>();

  const onFormSubmit: SubmitHandler<Record<string, string>> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            type={field.type}
            {...register(field.name)}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormWrapper;
