import { z } from "zod";

export const postPatchSchema = z.object({
  blogId: z.string(),
  content: z.any().optional(),
});

export type postPatchSchemaType = z.infer<typeof postPatchSchema>;

export const postUserEditorSchema = z.object({
  content: z.any().optional(),
});

export type postUserEditorSchemaType = z.infer<typeof postUserEditorSchema>;
