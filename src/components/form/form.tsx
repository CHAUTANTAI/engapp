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
}

const FormWrapper = <T extends FieldValues>({
  children,
  onSubmit,
  defaultValues,
  validationSchema,
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
        className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        {children} {/* Render control components here */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
