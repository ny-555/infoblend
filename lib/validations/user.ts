import { z } from "zod";

export const userPatchSchema = z.object({
  name: z.string().min(2).max(20),
});

export type userPatchSchemaType = z.infer<typeof userPatchSchema>;
