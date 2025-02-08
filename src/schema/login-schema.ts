import { z } from "zod";

export const AuthSchema = z.object({
  password: z.string().nonempty({ message: "Password is required" }),
  email: z.string().nonempty({ message: "Email is required" }),
  rule_id: z.number().optional(),
  rememberMe: z.boolean().optional(),
});
// .superRefine((data) => {
//   //Rule Id Default Value
//   if (data.rule_id === undefined) {
//     data.rule_id = 2;
//   }
// });

export type AuthSchemaType = z.infer<typeof AuthSchema>;
