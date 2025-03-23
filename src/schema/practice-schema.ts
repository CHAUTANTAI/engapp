import { z } from "zod";

export const PracticeSchema = z.object({
  name: z.string().nonempty({ message: "Name is required!" }),
  description: z.string().optional(),
  parent_id: z.number().optional(),
});

export type PracticeType = z.infer<typeof PracticeSchema>;
