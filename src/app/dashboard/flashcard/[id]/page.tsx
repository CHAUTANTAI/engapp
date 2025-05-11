"use client";
import { useParams } from "next/navigation";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { useEffect, useState } from "react";
import { ROUTER } from "../../../../const/routers";
import { useRouteControl } from "../../../../hook/routeControl";

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
}

const dummyCards: Card[] = [
  {
    card_id: 1,
    entry: "run",
    variants: [
      {
        variant_id: 1,
        part_of_speech: "verb",
        pronunciation: { UK: "/rʌn/", US: "/rʌn/" },
        definitions: [
          {
            definition_id: 1,
            definition:
              "To move swiftly on foot so that both feet leave the ground during each stride.",
            examples: ["She can run very fast.", "I run every morning."],
            grammar: {
              transitivity: "intransitive",
              tense: "present",
              label: "[I]",
            },
            collocations: ["run quickly", "run away"],
            usage_notes: "Used for both literal and figurative movement.",
          },
        ],
        frequency: "A1",
        cefr_level: "A1",
        phrasal_verbs: [
          {
            phrase_id: 1,
            phrase: "run into",
            definition: "To meet by chance.",
            examples: ["I ran into an old friend yesterday."],
          },
        ],
      },
      {
        variant_id: 2,
        part_of_speech: "noun",
        pronunciation: { UK: "/rʌn/", US: "/rʌn/" },
        definitions: [
          {
            definition_id: 2,
            definition: "An act or spell of running.",
            examples: ["He went for a run."],
            grammar: { countability: "countable", label: "[C]" },
          },
        ],
      },
    ],
    idioms: [
      {
        idiom_id: 1,
        phrase: "run out of steam",
        definition: "To lose energy or interest.",
        example: "He ran out of steam after working all day.",
      },
    ],
    synonyms: [{ word: "sprint" }, { word: "jog" }],
    antonyms: [{ word: "walk" }, { word: "stand" }],
    tags: ["academic", "spoken"],
  },
  {
    card_id: 2,
    entry: "light",
    variants: [
      {
        variant_id: 3,
        part_of_speech: "noun",
        pronunciation: { UK: "/laɪt/", US: "/laɪt/" },
        definitions: [
          {
            definition_id: 3,
            definition: "The natural agent that makes things visible.",
            examples: ["Light travels faster than sound."],
            grammar: { countability: "uncountable", label: "[U]" },
          },
        ],
      },
      {
        variant_id: 4,
        part_of_speech: "adjective",
        pronunciation: { UK: "/laɪt/", US: "/laɪt/" },
        definitions: [
          {
            definition_id: 4,
            definition: "Not heavy.",
            examples: ["This bag is very light."],
            grammar: { label: "[adj]" },
          },
        ],
      },
    ],
    idioms: [
      {
        idiom_id: 2,
        phrase: "see the light",
        definition: "To understand something clearly.",
        example: "After hours of explanation, he finally saw the light.",
      },
    ],
    synonyms: [{ word: "bright" }, { word: "illumination" }],
    antonyms: [{ word: "dark" }, { word: "heavy" }],
    tags: ["science", "daily"],
  },
  {
    card_id: 3,
    entry: "break",
    variants: [
      {
        variant_id: 5,
        part_of_speech: "verb",
        pronunciation: { UK: "/breɪk/", US: "/breɪk/" },
        definitions: [
          {
            definition_id: 5,
            definition:
              "To separate into pieces as a result of a blow, shock, or strain.",
            examples: ["He broke the vase."],
            grammar: {
              transitivity: "transitive",
              tense: "past",
              label: "[T]",
            },
            collocations: ["break a record", "break the law"],
            usage_notes: "Can be used both literally and figuratively.",
          },
        ],
        phrasal_verbs: [
          {
            phrase_id: 2,
            phrase: "break down",
            definition: "To stop functioning.",
            examples: ["My car broke down yesterday."],
          },
        ],
      },
    ],
    idioms: [
      {
        idiom_id: 3,
        phrase: "break the ice",
        definition: "To do or say something to relieve tension.",
        example: "He told a joke to break the ice.",
      },
    ],
    synonyms: [{ word: "shatter" }, { word: "crack" }],
    antonyms: [{ word: "fix" }, { word: "repair" }],
    tags: ["common", "spoken"],
  },
  {
    card_id: 4,
    entry: "bank",
    variants: [
      {
        variant_id: 6,
        part_of_speech: "noun",
        pronunciation: { UK: "/bæŋk/", US: "/bæŋk/" },
        definitions: [
          {
            definition_id: 6,
            definition:
              "An institution for receiving, lending, exchanging, and safeguarding money.",
            examples: ["She works at a bank."],
            grammar: { countability: "countable", label: "[C]" },
          },
        ],
      },
      {
        variant_id: 7,
        part_of_speech: "verb",
        pronunciation: { UK: "/bæŋk/", US: "/bæŋk/" },
        definitions: [
          {
            definition_id: 7,
            definition: "To deposit money in a bank.",
            examples: ["I banked my paycheck yesterday."],
            grammar: { transitivity: "transitive", label: "[T]" },
          },
        ],
      },
    ],
    idioms: [
      {
        idiom_id: 4,
        phrase: "bank on",
        definition: "To rely on something happening.",
        example: "You can bank on her support.",
      },
    ],
    synonyms: [{ word: "trust" }, { word: "rely" }],
    antonyms: [{ word: "distrust" }, { word: "doubt" }],
    tags: ["finance", "business"],
  },
  {
    card_id: 5,
    entry: "set",
    variants: [
      {
        variant_id: 8,
        part_of_speech: "verb",
        pronunciation: { UK: "/set/", US: "/set/" },
        definitions: [
          {
            definition_id: 8,
            definition: "To put something in a particular place or position.",
            examples: ["She set the vase on the table."],
            grammar: { transitivity: "transitive", label: "[T]" },
            collocations: ["set a goal", "set the table"],
            usage_notes: "Very polysemous verb.",
          },
        ],
        phrasal_verbs: [
          {
            phrase_id: 3,
            phrase: "set up",
            definition: "To arrange or organize.",
            examples: ["They set up a new company."],
          },
        ],
      },
      {
        variant_id: 9,
        part_of_speech: "noun",
        pronunciation: { UK: "/set/", US: "/set/" },
        definitions: [
          {
            definition_id: 9,
            definition: "A group or collection of things that belong together.",
            examples: ["A set of keys."],
            grammar: { countability: "countable", label: "[C]" },
          },
        ],
      },
    ],
    idioms: [
      {
        idiom_id: 5,
        phrase: "set in stone",
        definition: "To be fixed and unchangeable.",
        example: "The schedule isn't set in stone yet.",
      },
    ],
    synonyms: [{ word: "place" }, { word: "group" }],
    antonyms: [{ word: "remove" }, { word: "scatter" }],
    tags: ["polysemy", "academic"],
  },
];

export default function FlashcardDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [data, setData] = useState<Card[]>([]);
  const { redirectScreen } = useRouteControl();

  const handleGetCards = async () => {
    // Call API to get flashcard details using the id
    // For example: fetchFlashcardDetails(id);
    console.log("Fetching flashcard details for ID:", id);
    setData(dummyCards);
  };

  const listTemplate = (card: Card) => {
    return (
      <div className="relative w-full m-2 h-[14rem] flex flex-col p-4 border-1 border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out">
        <div className="flex flex-row gap-x-4 items-center">
          <div className="text-[3rem] text-black font-bold">{card.entry}</div>
          <Button
            className="w-[3%] h-[2rem]"
            icon="pi pi-pen-to-square"
            aria-label=""
          />
        </div>
        <ul className="text-[1.1rem] font-medium pl-0">Variants:</ul>
        {card.variants.map((variant: Variant) => (
          <li className="pl-4 my-1" key={variant.variant_id}>
            <strong>{variant.part_of_speech}</strong>:{" "}
            {variant.pronunciation.UK} {variant.definitions[0].definition}
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
      <DataView value={data} itemTemplate={listTemplate} paginator rows={6} />
    </>
  );
}
