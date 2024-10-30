import { z } from "zod";

export const createTaskBodySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  date_to_finish: z.string().transform((str) => new Date(str)),
});

export type CreateTaskBodySchema = z.infer<typeof createTaskBodySchema>;
