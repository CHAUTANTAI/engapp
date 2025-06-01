"use client";

import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useRouteControl } from "@/hook/routeControl";
import { ROUTER } from "@/const/routers";
import { classNames } from "primereact/utils";
import { useState } from "react";
import useDeckStore from "@/store/deck-store";

interface CreateDeckForm {
  title: string;
  description?: string;
}

const DeckNewPage = () => {
  const { redirectScreen } = useRouteControl();
  const [loading, setLoading] = useState(false);
  const { createDeck } = useDeckStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateDeckForm>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (formData: CreateDeckForm) => {
    console.log("Form data:", formData);
    setLoading(true);
    createDeck({
      account_id: 6,
      title: formData.title,
      description: formData.description,
    });
    setLoading(false);
    reset();
    redirectScreen(ROUTER.DECK);
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
          onClick={() => redirectScreen(ROUTER.DECK)}
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
              htmlFor="deckName"
              className="font-semibold text-[1.1rem] text-[var(--primaryColor)]"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames("p-inputtext-lg w-full", {
                    "p-invalid": errors.title,
                  })}
                  placeholder="Enter deck title"
                  autoFocus
                />
              )}
            />
            {errors.title && (
              <small className="text-red-500">{errors.title.message}</small>
            )}
          </div>
          {/* Description */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="deckDescription"
              className="font-semibold text-[1.1rem] text-[var(--primaryColor)]"
            >
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <InputTextarea
                  id={field.name}
                  {...field}
                  className="w-full"
                  rows={4}
                  placeholder="Enter deck description"
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

export default DeckNewPage;
