/* eslint-disable style/indent */
/* eslint-disable style/arrow-parens */
/* eslint-disable style/eol-last */
import { z } from "zod";

// Base Category schema for validation
export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z.string().url("Image must be a valid URL").optional().nullable(),
  createdAt: z
    .preprocess((val) => (val ? new Date(val as string) : undefined), z.date())
    .optional(),
  updatedAt: z
    .preprocess((val) => (val ? new Date(val as string) : undefined), z.date())
    .optional(),
});

export const IdParamSchema = z.object({
  id: z
    .string()
    .min(24)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "00b4766213f0732810a29d8a",
    }),
});

// Schema for creating a new category (without id)
export const CreateCategorySchema = CategorySchema.omit({
  id: true,
});

// Schema for updating an existing category (all fields optional except id)
export const UpdateCategorySchema = CategorySchema.omit({
  id: true,
}).partial();

// Type definitions derived from the schemas
export type Category = z.infer<typeof CategorySchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;