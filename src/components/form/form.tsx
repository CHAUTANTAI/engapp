// src/components/FormWrapper.tsx
import React, { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  FieldValues,
  Resolver,
  DefaultValues,
} from "react-hook-form";

// Interface for FormWrapper
interface FormWrapperProps<T extends FieldValues> {
  children: ReactNode; // The control components to be rendered inside the form
  onSubmit: SubmitHandler<T>; // Submit handler for the form
  defaultValues?: DefaultValues<T>; // Default values for the form fields
  validationSchema?: Resolver<T>; // Custom resolver for validation (optional)
  className?: string;
}

const FormWrapper = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  validationSchema,
  className = '',
}: FormWrapperProps<T>) => {
  // Create the form with useForm
  const methods: UseFormReturn<T> = useForm<T>({
    defaultValues,
    resolver: validationSchema, // Use custom validation resolver if provided
  });

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
