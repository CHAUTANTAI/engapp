"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { DataView, DataViewPageEvent } from "primereact/dataview";
import { Button } from "primereact/button";
import useFlashcardStore from "@/store/flashcard-store";
import { FlashcardModel } from "@/model/flashcard-model";
import CSkeleton from "@/components/common/component/skeleton";
import { ROUTER } from "@/const/routers";
import { useBreadcrumb } from "@/components/layout/breadscrum/breadscrum-context";
import useDeckStore from "@/store/deck-store";
import { useRouteControl } from "@/hook/routeControl";

interface DeckParams {
  deck_id?: string;
}

const FlashcardPage = () => {
  const { deck_id } = useParams() as DeckParams;

  const { redirectScreen } = useRouteControl();

  const { flashcards, fetchFlashcards, total_count } = useFlashcardStore();

  const { fetchDeckById, deckSelected } = useDeckStore();

  const { setBreadcrumb } = useBreadcrumb();

  const [loading, setLoading] = useState(true);

  const [paginator, setPaginator] = useState({
    first: 0,
    rows: 20,
  });

  const handleGetFlashcards = useCallback(async () => {
    setLoading(true);
    if (deck_id) {
      await fetchDeckById({
        id: Number(deck_id),
      });
      await fetchFlashcards({
        deck_id: Number(deck_id),
        limit: paginator.rows,
        offset: paginator.first,
      });
    }
    setLoading(false);
  }, [deck_id, fetchFlashcards, fetchDeckById, paginator]);

  useEffect(() => {
    handleGetFlashcards();
  }, [handleGetFlashcards]);

  useEffect(() => {
    const deckName = deckSelected?.title || "Deck Item";
    setBreadcrumb([
      { label: "Dashboard", route: ROUTER.DASHBOARD, icon: "pi pi-chart-bar" },
      { label: "Deck", route: ROUTER.DECK, icon: "pi pi-clone" },
      {
        label: `${deckName} Flashcards`,
        route: `${ROUTER.DECK_DETAIL}/${deck_id}`,
        icon: "pi pi-book",
      },
    ]);
  }, [deckSelected, deck_id, setBreadcrumb]);

  const listTemplate = (flashcard: FlashcardModel) => (
    <div
      key={flashcard.id}
      className="w-full min-h-[20vh] max-h-[40vh] m-2 p-4 border-1 border-gray-200 rounded-lg"
    >
      <div className="text-lg font-semibold mb-2">{flashcard.term}</div>
      <p className="text-gray-600">{flashcard.definition}</p>
    </div>
  );

  const handlePageChange = (e: DataViewPageEvent) => {
    setPaginator({
      first: e.first,
      rows: e.rows,
    });
  };

  return (
    <>
      <Button
        className="w-[31%] h-[20vh] m-2 mb-0 flex flex-col items-center justify-center gap-y-2"
        severity="success"
        icon="pi pi-plus text-[1.5rem]"
        outlined
        onClick={() => {
          redirectScreen(
            ROUTER.DECK_DETAIL_NEW_FLASHCARD.replace(
              "{deck_id}",
              String(deck_id)
            )
          );
        }}
      >
        <div className="text-[1.1rem] font-semibold text-[var(--green-600)]">
          New Flashcard
        </div>
      </Button>
      {loading ? (
        <CSkeleton variant="list" count={4} />
      ) : (
        <DataView
          value={flashcards}
          itemTemplate={listTemplate}
          paginator
          lazy
          totalRecords={total_count}
          rows={paginator.rows}
          first={paginator.first}
          onPage={handlePageChange}
        />
      )}
    </>
  );
};

export default FlashcardPage;
