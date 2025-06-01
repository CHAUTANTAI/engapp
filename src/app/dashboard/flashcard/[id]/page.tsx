"use client";
import { useParams } from "next/navigation";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { useEffect, useState } from "react";
import { ROUTER } from "../../../../const/routers";
import { useRouteControl } from "../../../../hook/routeControl";
import { useFlashcardStore } from "../../../../store/flashcard-store";
import {
  FlashcardModel,
  FlashcardVariantModel,
} from "../../../../model/flashcard-model";

interface Grammar {
  transitivity?: "transitive" | "intransitive" | "ditransitive";
  countability?: "countable" | "uncountable";
  tense?: string; // e.g., 'past', 'present'
  voice?: "active" | "passive";
  label?: string; // e.g., [T], [I], [U], etc.
  note?: string; // additional grammar info
}

interface Definition {
  definition_id: number;
  definition: string;
  examples: string[];
  grammar?: Grammar;
  collocations?: string[];
  usage_notes?: string;
}

interface PhrasalVerb {
  phrase_id: number;
  phrase: string;
  definition: string;
  examples: string[];
}

interface Variant {
  variant_id: number;
  part_of_speech: string; // e.g., 'noun', 'verb'
  pronunciation: {
    UK: string;
    US: string;
  };
  definitions: Definition[];
  frequency?: string; // e.g., A1, B2
  cefr_level?: string; // e.g., B1, C2
  phrasal_verbs?: PhrasalVerb[];
}

interface Idiom {
  idiom_id: number;
  phrase: string;
  definition: string;
  example: string;
}

interface Synonym {
  word: string;
  context?: string; // optional explanation of usage
}

interface Antonym {
  word: string;
  context?: string;
}

interface Card {
  card_id: number;
  entry: string;
  variants: Variant[];
  idioms: Idiom[];
  synonyms: Synonym[];
  antonyms: Antonym[];
  tags?: string[]; // e.g., ['academic', 'spoken']
  deck_ids: number[]; // IDs of decks this card belongs to
  account_id: number; // ID of the account that created this card
}

export default function FlashcardDetailPage() {
  const { flashcards_data, getFlashcards } = useFlashcardStore();
  const params = useParams();
  const id = params?.id;
  const { redirectScreen } = useRouteControl();

  const handleGetCards = async () => {
    getFlashcards({
      deck_id: Number(id),
    });
  };

  const listTemplate = (item: FlashcardModel) => {
    return (
      <div className="relative w-full m-2 h-[14rem] flex flex-col p-4 border-1 border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out">
        <div className="flex flex-row gap-x-4 items-center">
          <div className="text-[3rem] text-black font-bold">
            {item.flashcard_entry}
          </div>
          <Button
            className="w-[3%] h-[2rem]"
            icon="pi pi-pen-to-square"
            aria-label=""
          />
        </div>
        <ul className="text-[1.1rem] font-medium pl-0">Variants:</ul>
        {item.variants.map((variant: FlashcardVariantModel) => (
          <li className="pl-4 my-1" key={variant.variant_id}>
            <strong>{variant.variant_part_of_speech}</strong>:{" "}
            {variant.variant_pronunciation_uk}{" "}
            {variant.definitions[0].definition_definition}
          </li>
        ))}
        <Button
          className="absolute bottom-0 right-0 mr-2 mb-2"
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
        />
      </div>
    );
  };

  const getCardNewRoute = (id: string | number) =>
    `${ROUTER.FLASHCARD_DETAIL + "/" + id}/new`;

  const handleNewFlashcardClick = () => {
    if (!id) return;
    redirectScreen(getCardNewRoute(id as string));
  };

  useEffect(() => {
    // Call API to get flashcard details using the id
    // For example: fetchFlashcardDetails(id);
    console.log("Fetching flashcard details for ID:", id);
    handleGetCards();
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
          New Card
        </div>
      </Button>
      <DataView
        value={flashcards_data || []}
        itemTemplate={listTemplate}
        paginator
        rows={6}
      />
    </>
  );
}
