"use client";

import { DataView } from "primereact/dataview";
import { useEffect, useState } from "react";
import { useRouteControl } from "../../../hook/routeControl";
import { ROUTER } from "../../../const/routers";
import { Button } from "primereact/button";

interface Flashcard {
  flashcardId: number;
  flashcardName: string;
  flashcardDescription: string;
  numberOfCards: number;
}
export const getFlashcardDetailRoute = (id: string | number) =>
  `${ROUTER.FLASHCARD_DETAIL + id}`;

const FlashcardPage = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const { redirectScreen } = useRouteControl();
  const handleGetFlashcards = async () => {
    // const response = await fetch(
    //   "https://api.example.com/flashcards"
    // );
    // const data = await response.json();
    const flashcardData: Flashcard[] = [
      {
        flashcardId: 1,
        flashcardName: "France Capital",
        flashcardDescription: "What is the capital of France?",
        numberOfCards: 1,
      },
      {
        flashcardId: 2,
        flashcardName: "Largest Planet",
        flashcardDescription: "What is the largest planet in our solar system?",
        numberOfCards: 1,
      },
      {
        flashcardId: 3,
        flashcardName: "Gold Symbol",
        flashcardDescription: "What is the chemical symbol for gold?",
        numberOfCards: 1,
      },
      {
        flashcardId: 4,
        flashcardName: "Vietnam Capital",
        flashcardDescription: "What is the capital of Vietnam?",
        numberOfCards: 1,
      },
      {
        flashcardId: 5,
        flashcardName: "Water Formula",
        flashcardDescription: "What is the chemical formula for water?",
        numberOfCards: 1,
      },
      {
        flashcardId: 6,
        flashcardName: "Vietnam Capital",
        flashcardDescription: "What is the capital of Vietnam?",
        numberOfCards: 1,
      },
      {
        flashcardId: 7,
        flashcardName: "Water Formula",
        flashcardDescription: "What is the chemical formula for water?",
        numberOfCards: 1,
      },
    ];
    setFlashcards(flashcardData);
  };
  const listTemplate = (flashcard: Flashcard) => {
    return (
      <div
        className="w-[31%] h-[20vh] m-2 pt-0 flex flex-col p-4 border-1 border-gray-200 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out"
        onClick={() => handleFlashcardClick(flashcard.flashcardId)}
      >
        <h3 className="text-lg font-semibold">{flashcard.flashcardName}</h3>
        <p className="mt-0 text-gray-600">{flashcard.flashcardDescription}</p>
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
  }, []);
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
        value={flashcards}
        itemTemplate={listTemplate}
        paginator
        rows={6}
      />
    </>
  );
};

export default FlashcardPage;
