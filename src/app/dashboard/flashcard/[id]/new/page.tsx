/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useForm,
  Controller,
  useFieldArray,
  Control,
  FieldErrors,
} from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card as PrimeCard } from "primereact/card";
import { useParams } from "next/navigation";
import { useRouteControl } from "../../../../../hook/routeControl";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { getFlashcardDetailRoute } from "../../../../../util/funs";

// Interface gốc từ page.tsx
interface Definition {
  definition: string;
  examples: string[];
  grammar?: {
    transitivity?: string;
    tense?: string;
    label?: string;
    countability?: string;
  };
  collocations?: string[];
  usage_notes?: string;
}
interface PhrasalVerb {
  phrase: string;
  definition: string;
  examples: string[];
}
interface Variant {
  part_of_speech: string;
  pronunciation: { UK: string; US: string };
  definitions: Definition[];
  frequency?: string;
  cefr_level?: string;
  phrasal_verbs?: PhrasalVerb[];
}
interface Idiom {
  phrase: string;
  definition: string;
  example: string;
}
interface Synonym {
  word: string;
}
interface Antonym {
  word: string;
  context?: string;
}
interface CardFormValues {
  entry: string;
  variants: Variant[];
  idioms: Idiom[];
  synonyms: Synonym[];
  antonyms: Antonym[];
  tags?: string[];
}

const CardNewPage = () => {
  const params = useParams();
  const { redirectScreen } = useRouteControl();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CardFormValues>({
    defaultValues: {
      entry: "",
      variants: [
        {
          part_of_speech: "",
          pronunciation: { UK: "", US: "" },
          definitions: [
            {
              definition: "",
              examples: [""],
              grammar: {
                transitivity: "",
                tense: "",
                label: "",
                countability: "",
              },
              collocations: [""],
              usage_notes: "",
            },
          ],
          frequency: "",
          cefr_level: "",
          phrasal_verbs: [],
        },
      ],
      idioms: [],
      synonyms: [],
      antonyms: [],
      tags: [],
    },
  });

  // FieldArray cho variants
  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray<CardFormValues, "variants">({
    control,
    name: "variants",
  });

  // FieldArray cho idioms, synonyms, antonyms
  const {
    fields: idiomFields,
    append: appendIdiom,
    remove: removeIdiom,
  } = useFieldArray<CardFormValues, "idioms">({
    control,
    name: "idioms",
  });
  const {
    fields: synonymFields,
    append: appendSynonym,
    remove: removeSynonym,
  } = useFieldArray<CardFormValues, "synonyms">({
    control,
    name: "synonyms",
  });
  const {
    fields: antonymFields,
    append: appendAntonym,
    remove: removeAntonym,
  } = useFieldArray<CardFormValues, "antonyms">({
    control,
    name: "antonyms",
  });

  const onSubmit = (data: CardFormValues) => {
    console.log("Form data:", data);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      reset();
      redirectScreen(getFlashcardDetailRoute(params?.id as string));
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[80vh] bg-white pt-6">
      {/* Top buttons */}
      <div className="flex w-full max-w-xl justify-between mb-6">
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          severity="secondary"
          outlined
          className="w-[48%]"
          onClick={() =>
            redirectScreen(getFlashcardDetailRoute(params?.id as string))
          }
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
      <PrimeCard className="w-full max-w-xl shadow-md border-1 border-gray-200">
        <form className="flex flex-col gap-y-5">
          {/* Entry */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="entry"
              className="font-semibold text-[1.1rem] text-[var(--primaryColor)]"
            >
              Entry <span className="text-red-500">*</span>
            </label>
            <Controller
              name="entry"
              control={control}
              rules={{ required: "Entry is required" }}
              render={({ field }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames("p-inputtext-lg w-full", {
                    "p-invalid": errors.entry,
                  })}
                  placeholder="Enter word or phrase"
                  autoFocus
                />
              )}
            />
            {errors.entry && (
              <small className="text-red-500">{errors.entry.message}</small>
            )}
          </div>
          {/* Variants */}
          <div className="flex flex-col gap-y-2">
            <label className="font-semibold text-[1.1rem] text-[var(--primaryColor)]">
              Variants
            </label>
            {variantFields.map((variant, vIdx) => (
              <div
                key={variant.id}
                className="border p-3 rounded mb-3 bg-gray-50"
              >
                <div className="flex gap-2 mb-2">
                  <Controller
                    name={`variants.${vIdx}.part_of_speech`}
                    control={control}
                    rules={{ required: "Part of speech is required" }}
                    render={({ field }) => (
                      <InputText
                        {...field}
                        className={classNames("w-1/2", {
                          "p-invalid": errors.variants?.[vIdx]?.part_of_speech,
                        })}
                        placeholder="Part of speech (e.g. noun, verb)"
                      />
                    )}
                  />
                  <Controller
                    name={`variants.${vIdx}.pronunciation.UK`}
                    control={control}
                    render={({ field }) => (
                      <InputText
                        {...field}
                        className="w-1/4"
                        placeholder="UK"
                      />
                    )}
                  />
                  <Controller
                    name={`variants.${vIdx}.pronunciation.US`}
                    control={control}
                    render={({ field }) => (
                      <InputText
                        {...field}
                        className="w-1/4"
                        placeholder="US"
                      />
                    )}
                  />
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    text
                    type="button"
                    className="ml-2"
                    onClick={() => removeVariant(vIdx)}
                    disabled={variantFields.length === 1}
                  />
                </div>
                <div className="flex gap-2 mb-2">
                  <Controller
                    name={`variants.${vIdx}.frequency`}
                    control={control}
                    render={({ field }) => (
                      <InputText
                        {...field}
                        className="w-1/2"
                        placeholder="Frequency (e.g. A1, B2)"
                      />
                    )}
                  />
                  <Controller
                    name={`variants.${vIdx}.cefr_level`}
                    control={control}
                    render={({ field }) => (
                      <InputText
                        {...field}
                        className="w-1/2"
                        placeholder="CEFR Level"
                      />
                    )}
                  />
                </div>
                {/* Definitions FieldArray */}
                <DefinitionsFieldArray
                  nestIndex={vIdx}
                  control={control}
                  errors={errors}
                />
                {/* Phrasal Verbs FieldArray */}
                <PhrasalVerbsFieldArray nestIndex={vIdx} control={control} />
              </div>
            ))}
            <Button
              icon="pi pi-plus"
              label="Add Variant"
              type="button"
              outlined
              className="w-fit mt-2"
              onClick={() =>
                appendVariant({
                  part_of_speech: "",
                  pronunciation: { UK: "", US: "" },
                  definitions: [
                    {
                      definition: "",
                      examples: [""],
                      grammar: {
                        transitivity: "",
                        tense: "",
                        label: "",
                        countability: "",
                      },
                      collocations: [""],
                      usage_notes: "",
                    },
                  ],
                  frequency: "",
                  cefr_level: "",
                  phrasal_verbs: [],
                })
              }
            />
          </div>
          {/* Idioms */}
          <ArrayField<Idiom>
            label="Idioms"
            fields={idiomFields}
            append={appendIdiom}
            remove={removeIdiom}
            control={control}
            name="idioms"
            itemFields={[
              { name: "phrase", placeholder: "Phrase" },
              { name: "definition", placeholder: "Definition" },
              { name: "example", placeholder: "Example" },
            ]}
          />
          {/* Synonyms */}
          <ArrayField<Synonym>
            label="Synonyms"
            fields={synonymFields}
            append={appendSynonym}
            remove={removeSynonym}
            control={control}
            name="synonyms"
            itemFields={[{ name: "word", placeholder: "Word" }]}
          />
          {/* Antonyms */}
          <ArrayField<Antonym>
            label="Antonyms"
            fields={antonymFields}
            append={appendAntonym}
            remove={removeAntonym}
            control={control}
            name="antonyms"
            itemFields={[
              { name: "word", placeholder: "Word" },
              { name: "context", placeholder: "Context (optional)" },
            ]}
          />
        </form>
      </PrimeCard>
    </div>
  );
};

// Definitions FieldArray component
interface DefinitionsFieldArrayProps {
  nestIndex: number;
  control: Control<CardFormValues>;
  errors: FieldErrors<CardFormValues>;
}
const DefinitionsFieldArray = ({
  nestIndex,
  control,
  errors,
}: DefinitionsFieldArrayProps) => {
  const { fields, append, remove } = useFieldArray<CardFormValues, any>({
    control,
    name: `variants.${nestIndex}.definitions` as any,
  });

  return (
    <div className="mt-2">
      <label className="font-semibold">Definitions</label>
      {fields.map((def, dIdx) => (
        <div
          key={def.id}
          className="flex flex-col gap-2 mb-2 border p-2 rounded bg-white"
        >
          <Controller
            name={`variants.${nestIndex}.definitions.${dIdx}.definition`}
            control={control}
            rules={{ required: "Definition is required" }}
            render={({ field }) => (
              <InputText
                {...field}
                className={classNames("w-full", {
                  "p-invalid":
                    errors?.variants?.[nestIndex]?.definitions?.[dIdx]
                      ?.definition,
                })}
                placeholder="Definition"
              />
            )}
          />
          {/* Examples FieldArray */}
          <ExamplesFieldArray
            nestIndex={nestIndex}
            defIndex={dIdx}
            control={control}
          />
          {/* Grammar */}
          <div className="flex gap-2">
            <Controller
              name={`variants.${nestIndex}.definitions.${dIdx}.grammar.transitivity`}
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  className="w-1/4"
                  placeholder="Transitivity"
                />
              )}
            />
            <Controller
              name={`variants.${nestIndex}.definitions.${dIdx}.grammar.tense`}
              control={control}
              render={({ field }) => (
                <InputText {...field} className="w-1/4" placeholder="Tense" />
              )}
            />
            <Controller
              name={`variants.${nestIndex}.definitions.${dIdx}.grammar.label`}
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  className="w-1/4"
                  placeholder="Label (e.g. [T], [I])"
                />
              )}
            />
            <Controller
              name={`variants.${nestIndex}.definitions.${dIdx}.grammar.countability`}
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  className="w-1/4"
                  placeholder="Countability"
                />
              )}
            />
          </div>
          {/* Collocations FieldArray */}
          <CollocationsFieldArray
            nestIndex={nestIndex}
            defIndex={dIdx}
            control={control}
          />
          {/* Usage Notes */}
          <Controller
            name={`variants.${nestIndex}.definitions.${dIdx}.usage_notes`}
            control={control}
            render={({ field }) => (
              <InputTextarea
                {...field}
                className="w-full"
                placeholder="Usage notes"
                autoResize
              />
            )}
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            text
            type="button"
            className="w-fit"
            onClick={() => remove(dIdx)}
            disabled={fields.length === 1}
          />
        </div>
      ))}
      <Button
        icon="pi pi-plus"
        label="Add Definition"
        type="button"
        outlined
        className="w-fit mt-1"
        onClick={() =>
          append({
            definition: "",
            examples: [""],
            grammar: {
              transitivity: "",
              tense: "",
              label: "",
              countability: "",
            },
            collocations: [""],
            usage_notes: "",
          })
        }
      />
    </div>
  );
};

// Examples FieldArray
interface ExamplesFieldArrayProps {
  nestIndex: number;
  defIndex: number;
  control: Control<CardFormValues>;
}
const ExamplesFieldArray = ({
  nestIndex,
  defIndex,
  control,
}: ExamplesFieldArrayProps) => {
  const { fields, append, remove } = useFieldArray<CardFormValues, any>({
    control,
    name: `variants.${nestIndex}.definitions.${defIndex}.examples` as any,
  });
  return (
    <div>
      <label>Examples</label>
      {fields.map((item, idx) => (
        <div key={item.id} className="flex gap-2 mb-1">
          <Controller
            name={`variants.${nestIndex}.definitions.${defIndex}.examples.${idx}`}
            control={control}
            render={({ field }) => (
              <InputText {...field} className="w-full" placeholder="Example" />
            )}
          />
          <Button
            icon="pi pi-trash"
            text
            type="button"
            onClick={() => remove(idx)}
          />
        </div>
      ))}
      <Button
        icon="pi pi-plus"
        label="Add Example"
        type="button"
        outlined
        className="w-fit"
        onClick={() => append("")}
      />
    </div>
  );
};
// Collocations FieldArray
interface CollocationsFieldArrayProps {
  nestIndex: number;
  defIndex: number;
  control: Control<CardFormValues>;
}
const CollocationsFieldArray = ({
  nestIndex,
  defIndex,
  control,
}: CollocationsFieldArrayProps) => {
  const { fields, append, remove } = useFieldArray<CardFormValues, any>({
    control,
    name: `variants.${nestIndex}.definitions.${defIndex}.collocations` as any,
  });
  return (
    <div>
      <label>Collocations</label>
      {fields.map((item, idx) => (
        <div key={item.id} className="flex gap-2 mb-1">
          <Controller
            name={`variants.${nestIndex}.definitions.${defIndex}.collocations.${idx}`}
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                className="w-full"
                placeholder="Collocation"
              />
            )}
          />
          <Button
            icon="pi pi-trash"
            text
            type="button"
            onClick={() => remove(idx)}
          />
        </div>
      ))}
      <Button
        icon="pi pi-plus"
        label="Add Collocation"
        type="button"
        outlined
        className="w-fit"
        onClick={() => append("")}
      />
    </div>
  );
};

// PhrasalVerbs FieldArray
interface PhrasalVerbsFieldArrayProps {
  nestIndex: number;
  control: Control<CardFormValues>;
}
const PhrasalVerbsFieldArray = ({
  nestIndex,
  control,
}: PhrasalVerbsFieldArrayProps) => {
  const { fields, append, remove } = useFieldArray<
    CardFormValues,
    `variants.${number}.phrasal_verbs`
  >({
    control,
    name: `variants.${nestIndex}.phrasal_verbs`,
  });
  return (
    <div className="mt-2">
      <label className="font-semibold">Phrasal Verbs</label>
      {fields.map((item, idx) => (
        <div key={item.id} className="flex gap-2 items-center mb-2">
          <Controller
            name={`variants.${nestIndex}.phrasal_verbs.${idx}.phrase`}
            control={control}
            render={({ field }) => (
              <InputText {...field} className="w-1/3" placeholder="Phrase" />
            )}
          />
          <Controller
            name={`variants.${nestIndex}.phrasal_verbs.${idx}.definition`}
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                className="w-1/3"
                placeholder="Definition"
              />
            )}
          />
          <Controller
            name={`variants.${nestIndex}.phrasal_verbs.${idx}.examples.0`}
            control={control}
            render={({ field }) => (
              <InputText {...field} className="w-1/3" placeholder="Example" />
            )}
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            text
            type="button"
            className="ml-2"
            onClick={() => remove(idx)}
            disabled={fields.length === 0}
          />
        </div>
      ))}
      <Button
        icon="pi pi-plus"
        label="Add Phrasal Verb"
        type="button"
        outlined
        className="w-fit mt-1"
        onClick={() => append({ phrase: "", definition: "", examples: [""] })}
      />
    </div>
  );
};

// Generic ArrayField for idioms, synonyms, antonyms
type ArrayFieldProps<T extends object> = {
  label: string;
  fields: { id: string }[];
  append: (value: T) => void;
  remove: (index: number) => void;
  control: Control<CardFormValues>;
  name: string;
  itemFields: { name: keyof T; placeholder: string }[];
};
function ArrayField<T extends object>({
  label,
  fields,
  append,
  remove,
  control,
  name,
  itemFields,
}: ArrayFieldProps<T>) {
  return (
    <div className="flex flex-col gap-y-2">
      <label className="font-semibold text-[1.1rem] text-[var(--primaryColor)]">
        {label}
      </label>
      {fields.map((item, idx) => (
        <div key={item.id} className="flex gap-2 items-center mb-2">
          {itemFields.map((f) => (
            <Controller
              key={String(f.name)}
               
              name={`${name}.${idx}.${String(f.name)}` as any}
              control={control}
              render={({ field }) => (
                <InputText
                  {...field}
                  className="w-1/3"
                  placeholder={f.placeholder}
                />
              )}
            />
          ))}
          <Button
            icon="pi pi-trash"
            severity="danger"
            text
            type="button"
            className="ml-2"
            onClick={() => remove(idx)}
            disabled={fields.length === 0}
          />
        </div>
      ))}
      <Button
        icon="pi pi-plus"
        label={`Add ${label.slice(0, -1)}`}
        type="button"
        outlined
        className="w-fit mt-1"
        onClick={() =>
          append(
            itemFields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {} as T)
          )
        }
      />
    </div>
  );
}

export default CardNewPage;
