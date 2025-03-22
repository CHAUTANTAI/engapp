import { z } from "zod";

export const VocabSchema = z.object({
  word: z.string().nonempty({ message: "Word is required!" }),
  meaning: z.string().nonempty({ message: "Meaning is required!" }),
  ipa: z.string().optional(),
  stress: z.number().optional(),
  example: z.string().optional(),
  class_id: z
    .array(z.number())
    .min(1, { message: "At least one class is required!" }),
});

export type VocabSchemaType = z.infer<typeof VocabSchema>;
