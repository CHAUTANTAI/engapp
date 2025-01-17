import { z } from "zod";

export const loginSchema = z.object({
  password: z.string().nonempty({ message: "Password is required" }),
  email: z.string().nonempty({ message: "Email is required" })
});

export type LoginSchemaType = z.infer<typeof loginSchema>;