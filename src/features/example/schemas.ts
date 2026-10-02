import { z } from "zod";

export const itemSchema = z.object({
  title: z.string().trim().min(1, "Enter a title"),
});

export type ItemValues = z.infer<typeof itemSchema>;
