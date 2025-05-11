"use client";

import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useRouteControl } from "../../../../hook/routeControl";
import { ROUTER } from "../../../../const/routers";
import { classNames } from "primereact/utils";
import { useState } from "react";

interface CreateFlashcardForm {
  flashcardName: string;
  flashcardDescription: string;
}

const FlashcardNewPage = () => {
  const { redirectScreen } = useRouteControl();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateFlashcardForm>({
    defaultValues: {
      flashcardName: "",
      flashcardDescription: "",
    },
  });

  const onSubmit = (data: CreateFlashcardForm) => {
    console.log("Form data:", data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      reset();
      redirectScreen(ROUTER.FLASHCARD);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[80vh] bg-white pt-6">
      {/* Top buttons */}
      <div className="flex w-full max-w-xs justify-between mb-6">
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          severity="secondary"
          outlined
          className="w-[48%]"
          onClick={() => redirectScreen(ROUTER.FLASHCARD)}
        />
        <Button
          label="Create"
          icon="pi pi-check"
          severity="success"
          className="w-[48%]"
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
      {/* Card Form */}
      <Card className="w-full max-w-4xl shadow-md border-1 border-gray-200">
        <form className="flex flex-col gap-y-5">
          {/* Name */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="flashcardName"
              className="font-semibold text-[1.1rem] text-[var(--primaryColor)]"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <Controller
              name="flashcardName"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames("p-inputtext-lg w-full", {
                    "p-invalid": errors.flashcardName,
                  })}
                  placeholder="Enter flashcard name"
                  autoFocus
                />
              )}
            />
            {errors.flashcardName && (
              <small className="text-red-500">
                {errors.flashcardName.message}
              </small>
            )}
          </div>
          {/* Description */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="flashcardDescription"
              className="font-semibold text-[1.1rem] text-[var(--primaryColor)]"
            >
              Description
            </label>
            <Controller
              name="flashcardDescription"
              control={control}
              render={({ field }) => (
                <InputTextarea
                  id={field.name}
                  {...field}
                  className="w-full"
                  rows={4}
                  placeholder="Enter flashcard description"
                  autoResize
                />
              )}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FlashcardNewPage;
