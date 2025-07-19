/* eslint-disable style/eol-last */
import { z } from "zod";

export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string().min(1, "User ID is required"),
  total: z.number().nonnegative("Total must be a non-negative number"),
  status: z.string().default("PENDING"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateOrderSchema = OrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateOrderSchema = OrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

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

export type Order = z.infer<typeof OrderSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderInput = z.infer<typeof UpdateOrderSchema>;