/* eslint-disable style/eol-last */
import { z } from "zod";

export const SaleSchema = z.object({
  id: z.string(),
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  total: z.number().nonnegative("Total must be a non-negative number"),
  soldAt: z.date().optional(),
});

export const CreateSaleSchema = SaleSchema.omit({
  id: true,
  soldAt: true,
});

export const UpdateSaleSchema = SaleSchema.omit({
  id: true,
  soldAt: true,
}).partial();

export type Sale = z.infer<typeof SaleSchema>;
export type CreateSaleInput = z.infer<typeof CreateSaleSchema>;
export type UpdateSaleInput = z.infer<typeof UpdateSaleSchema>;