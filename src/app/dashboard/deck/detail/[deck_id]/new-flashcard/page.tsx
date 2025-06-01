"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";

import { useRouteControl } from "@/hook/routeControl";
import { useBreadcrumb } from "@/components/layout/breadscrum/breadscrum-context";
import { ROUTER } from "@/const/routers";
import useFlashcardStore from "@/store/flashcard-store";
import useDeckStore from "@/store/deck-store";

interface CreateFlashcardForm {
  term: string;
  definition?: string;
}

interface DeckParams {
  deck_id?: string;
}

const FlashcardNewPage = () => {
  const { deck_id } = useParams() as DeckParams;

  const { redirectScreen } = useRouteControl();

  const { createFlashcard } = useFlashcardStore();

  const { fetchDeckById, deckSelected } = useDeckStore();

  const { setBreadcrumb } = useBreadcrumb();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateFlashcardForm>({
    defaultValues: {
      term: "",
      definition: "",
    },
  });

  const onSubmit = async (formData: CreateFlashcardForm) => {
    if (!deck_id) return;
    setLoading(true);
    await createFlashcard({
      deck_id: Number(deck_id),
      term: formData.term,
      definition: formData.definition,
    });
    setLoading(false);
    reset();
    redirectScreen(`${ROUTER.DECK_DETAIL}/${deck_id}`);
  };

  useEffect(() => {
    if (deck_id) {
      fetchDeckById({ id: Number(deck_id) });
    }
  }, [deck_id, fetchDeckById]);

  useEffect(() => {
    const deckName = deckSelected?.title || "Deck Item";
    setBreadcrumb([
      { label: "Dashboard", route: ROUTER.DASHBOARD, icon: "pi pi-chart-bar" },
      { label: "Deck", route: ROUTER.DECK, icon: "pi pi-clone" },
      {
        label: deckName + " Flashcards",
        route: `${ROUTER.DECK_DETAIL}/${deck_id}`,
        icon: "pi pi-book",
      },
      {
        label: "New Flashcard",
        route: `${ROUTER.DECK_DETAIL_NEW_FLASHCARD.replace(
          "{deck_id}",
          String(deck_id)
        )}`,
        icon: "pi pi-clone",
      },
    ]);
  }, [deckSelected, deck_id, setBreadcrumb]);

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
          onClick={() => redirectScreen(`${ROUTER.DECK_DETAIL}/${deck_id}`)}
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
          {/* Term */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="flashcardTerm"
              className="font-semibold text-[1.1rem] text-[var(--primaryColor)]"
            >
              Term <span className="text-red-500">*</span>
            </label>
            <Controller
              name="term"
              control={control}
              rules={{ required: "Term is required" }}
              render={({ field }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames("p-inputtext-lg w-full", {
                    "p-invalid": errors.term,
                  })}
                  placeholder="Enter term"
                  autoFocus
                />
              )}
            />
            {errors.term && (
              <small className="text-red-500">{errors.term.message}</small>
            )}
          </div>

          {/* Definition */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="flashcardDefinition"
              className="font-semibold text-[1.1rem] text-[var(--primaryColor)]"
            >
              Definition
            </label>
            <Controller
              name="definition"
              control={control}
              render={({ field }) => (
                <InputTextarea
                  id={field.name}
                  {...field}
                  className="w-full"
                  rows={4}
                  placeholder="Enter definition"
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
