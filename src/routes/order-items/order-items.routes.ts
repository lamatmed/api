/* eslint-disable style/eol-last */
/* eslint-disable perfectionist/sort-imports */
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";
import { DeleteResponseSchema, NotFoundSchema } from "@/lib/constants";
import { CreateOrderItemSchema, OrderItemSchema, UpdateOrderItemSchema } from "./order-items.schema";

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

const tags = ["OrderItems"];

export const list = createRoute({
  path: "/order-items",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(OrderItemSchema),
      "The List of OrderItems",
    ),
  },
});

export const create = createRoute({
  path: "/order-items",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(
      CreateOrderItemSchema,
      "The OrderItem to Create",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      OrderItemSchema,
      "The Created OrderItem",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(CreateOrderItemSchema),
      "The Validation Errors",
    ),
  },
});

export const getOne = createRoute({
  path: "/order-items/{id}",
  method: "get",
  request: {
    params: IdParamSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      OrderItemSchema,
      "The requested OrderItem",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      IdParamSchema,
      "Invalid Id Error",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "OrderItem Not Found",
    ),
  },
});

export const update = createRoute({
  path: "/order-items/{id}",
  method: "patch",
  tags,
  request: {
    params: IdParamSchema,
    body: jsonContentRequired(
      UpdateOrderItemSchema,
      "The OrderItem Updates",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      OrderItemSchema,
      "The updated OrderItem",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "OrderItem Not Found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(UpdateOrderItemSchema), createErrorSchema(IdParamSchema)],
      "The Validation Errors",
    ),
  },
});

export const remove = createRoute({
  path: "/order-items/{id}",
  method: "delete",
  request: {
    params: IdParamSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      DeleteResponseSchema,
      "OrderItem Deleted",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      IdParamSchema,
      "Invalid Id Error",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "OrderItem Not Found",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;