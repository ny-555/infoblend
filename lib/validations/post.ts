import { z } from "zod";

export const postPatchSchema = z.object({
  title: z.string().min(3).max(128),
  blogId: z.string(),
  content: z.any().optional(),
});

export type postPatchSchemaType = z.infer<typeof postPatchSchema>;

export const postUserEditorSchema = z.object({
  title: z.string().min(3).max(128),
  content: z.any().optional(),
});

export type postUserEditorSchemaType = z.infer<typeof postPatchSchema>;
