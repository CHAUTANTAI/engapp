"use client";

import { DataView } from "primereact/dataview";
import { useCallback, useEffect } from "react";
import { useRouteControl } from "../../../hook/routeControl";
import { ROUTER } from "../../../const/routers";
import { Button } from "primereact/button";
import { getFlashcardDetailRoute } from "../../../util/funs";
import { useDeckStore } from "../../../store/deck-store";

interface Deck {
  deck_id: number;
  deck_name: string;
  deck_description: string;
}
const FlashcardPage = () => {
  const { decks_data, getDecks } = useDeckStore();
  const { redirectScreen } = useRouteControl();
  const handleGetFlashcards = useCallback(async () => {
    await getDecks();
  }, [getDecks]);
  const listTemplate = (deck: Deck) => {
    return (
      <div
        className="w-[31%] h-[20vh] m-2 pt-0 flex flex-col p-4 border-1 border-gray-200 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out"
        onClick={() => handleFlashcardClick(deck.deck_id)}
      >
        <h3 className="text-lg font-semibold">{deck.deck_name}</h3>
        <p className="mt-0 text-gray-600">{deck.deck_description}</p>
      </div>
    );
  };

  const handleFlashcardClick = (id: string | number) => {
    redirectScreen(getFlashcardDetailRoute(id));
  };

  const handleNewFlashcardClick = () => {
    redirectScreen(ROUTER.FLASHCARD_NEW);
  };

  useEffect(() => {
    handleGetFlashcards();
  }, [handleGetFlashcards]);
  return (
    <>
      <Button
        className="w-[31%] h-[20vh] m-2 mb-0 flex flex-col items-center justify-center gap-y-2"
        severity="success"
        icon="pi pi-plus text-[1.5rem]"
        outlined
        onClick={handleNewFlashcardClick}
      >
        <div className="text-[1.1rem] font-semibold text-[var(--green-600)]">
          New Flashcard
        </div>
      </Button>
      <DataView
        value={decks_data}
        itemTemplate={listTemplate}
        paginator
        rows={6}
      />
    </>
  );
};

export default FlashcardPage;
