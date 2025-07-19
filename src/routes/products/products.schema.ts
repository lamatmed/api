/* eslint-disable style/eol-last */
/* eslint-disable style/comma-dangle */
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Image must be a valid URL"),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  categoryId: z.string().min(1, "Category ID is required"),
  createdById: z.string().min(1, "Creator (User) ID is required"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const IdParamSchema = z.object({
  id: z.string().min(24).openapi({
    param: { name: "id", in: "path" },
    example: "00b4766213f0732810a29d8a",
  }),
});

export const UserIdParamSchema = z.object({
  userId: z.string().min(24).openapi({
    param: { name: "userId", in: "path" },
    example: "00b4766213f0732810a29d8a",
  }),
});

export const ProductQuerySchema = z.object({
  limit: z.string().regex(/^\d+$/).optional(),
  cursor: z.string().optional(),
  categoryId: z.string().optional(),
  search: z.string().optional(),
});

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export type Product = z.infer<typeof ProductSchema>;
export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;