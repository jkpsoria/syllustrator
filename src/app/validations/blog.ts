import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title is requiredzzz.")
    .max(100, "Title is too long."),
  content: z.string().min(1, "Content is required."),
});

export type BlogSchema = z.infer<typeof blogSchema>;

export const blogPatchSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required.")
    .max(100, "Title is too long.")
    .optional(),
  content: z.string().min(1, "Content is required.").optional(),
});

export type BlogPatchSchema = z.infer<typeof blogPatchSchema>;
