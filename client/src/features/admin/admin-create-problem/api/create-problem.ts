import { z } from "zod";

export const createProblemSchema = z.object({
  title: z.string().min(1).max(100),
  question: z.string().min(5).max(750),
  slug: z.string().min(1).max(110),
});

export type CreateProblemInput = z.infer<typeof createProblemSchema>;
