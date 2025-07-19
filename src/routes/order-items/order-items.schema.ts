/* eslint-disable style/eol-last */
import { z } from "zod";

export const OrderItemSchema = z.object({
  id: z.string(),
  orderId: z.string().min(1, "Order ID is required"),
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  price: z.number().nonnegative("Price must be a non-negative number"),
});

export const CreateOrderItemSchema = OrderItemSchema.omit({
  id: true,
});

export const UpdateOrderItemSchema = OrderItemSchema.omit({
  id: true,
}).partial();

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type CreateOrderItemInput = z.infer<typeof CreateOrderItemSchema>;
export type UpdateOrderItemInput = z.infer<typeof UpdateOrderItemSchema>;