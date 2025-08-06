import { z } from "zod";

export const InputTextAreaSchema = z.object({
  input: z.string().min(5, { message: "User Input is required." }),
});
