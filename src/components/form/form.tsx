// src/components/FormWrapper.tsx
import React, { ReactNode } from "react";
import {
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";

// Interface for FormWrapper
interface FormWrapperProps<T extends FieldValues> {
  children: ReactNode; // The control components to be rendered inside the form
  onSubmit: SubmitHandler<T>; // Submit handler for the form
  className?: string;
  methods: UseFormReturn<T>;
}

const FormWrapper = <T extends FieldValues>({
  children,
  onSubmit,
  className = "",
  methods,
}: FormWrapperProps<T>) => {
  // Create the form with useForm

  return (
    <FormProvider {...methods}>
      {/* Provide context for all form control components */}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`${className}`}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
