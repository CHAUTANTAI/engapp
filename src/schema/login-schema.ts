import { z } from "zod";

export const loginSchema = z.object({
  userName: z
    .string()
    .nonempty({ message: "Username is required" })
    .min(10, { message: "Min Length of Username is 10 character" })
    .max(50, { message: "Max length of Username is 50 character" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  password: z.string().nonempty({ message: "Password is required" }),
});
