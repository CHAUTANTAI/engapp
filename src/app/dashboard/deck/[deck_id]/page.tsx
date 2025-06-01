"use client";

import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useRouteControl } from "@/hook/routeControl";
import { ROUTER } from "@/const/routers";
import { classNames } from "primereact/utils";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useBreadcrumb } from "@/components/layout/breadscrum/breadscrum-context";
import useDeckStore from "@/store/deck-store";
import CSkeleton from "@/components/common/component/skeleton";

interface CreateDeckForm {
  title: string;
  description?: string;
}

export interface DeckParams {
  deck_id?: number;
}

const DeckNewPage = () => {
  const { deck_id } = useParams() as DeckParams;

  const { redirectScreen } = useRouteControl();

  const [loading, setLoading] = useState(false);

  const { modifyDeck, fetchDeckById, deckSelected } = useDeckStore();

  const { setBreadcrumb } = useBreadcrumb();

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

  const onSubmit = async (formData: CreateDeckForm) => {
    console.log("Form data:", formData);
    if (deck_id) {
      await modifyDeck({
        id: deck_id,
        title: formData.title,
        description: formData.description,
      });
      reset();
      redirectScreen(ROUTER.DECK);
    }
  };

  const handleInit = useCallback(async () => {
    setLoading(true);
    if (deck_id) {
      const deck = await fetchDeckById({ id: deck_id });
      if (deck) {
        reset({
          description: deck.description,
          title: deck.title,
        });
      }
    }
    setLoading(false);
  }, [fetchDeckById, deck_id, reset]);

  useEffect(() => {
    handleInit();
  }, [handleInit]);

  useEffect(() => {
    const title = deckSelected?.title || "Deck Item";
    setBreadcrumb([
      { label: "Dashboard", route: ROUTER.DASHBOARD, icon: "pi pi-chart-bar" },
      { label: "Deck", route: ROUTER.DECK, icon: "pi pi-clone" },
      {
        label: title,
        route: `${ROUTER.DECK}/${deck_id}`,
        icon: "pi pi-book",
      },
    ]);
  }, [deck_id, setBreadcrumb, deckSelected]);

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
          label="Modify"
          icon="pi pi-check"
          severity="success"
          className="w-[48%]"
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
      {/* Card Form */}
      {loading ? (
        <CSkeleton variant="list" />
      ) : (
        <Card className="w-full max-w-4xl shadow-md border-1 border-gray-200">
          <form className="flex flex-col gap-y-5">
            {/* Name */}
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="title"
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
                    placeholder="Enter deck Title"
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
                htmlFor="description"
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
      )}
    </div>
  );
};

export default DeckNewPage;
