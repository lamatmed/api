/* eslint-disable style/eol-last */
/* eslint-disable perfectionist/sort-imports */
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";
import { DeleteResponseSchema, NotFoundSchema } from "@/lib/constants";
import { CreateOrderSchema, IdParamSchema, OrderSchema, UpdateOrderSchema } from "./orders.schema";

const tags = ["Orders"];

export const list = createRoute({
  path: "/orders",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(OrderSchema),
      "The List of Orders",
    ),
  },
});

export const create = createRoute({
  path: "/orders",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(
      CreateOrderSchema,
      "The Order to Create",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      OrderSchema,
      "The Created Order",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(CreateOrderSchema),
      "The Validation Errors",
    ),
  },
});

export const getOne = createRoute({
  path: "/orders/{id}",
  method: "get",
  request: {
    params: IdParamSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      OrderSchema,
      "The requested Order",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      IdParamSchema,
      "Invalid Id Error",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "Order Not Found",
    ),
  },
});

export const update = createRoute({
  path: "/orders/{id}",
  method: "patch",
  tags,
  request: {
    params: IdParamSchema,
    body: jsonContentRequired(
      UpdateOrderSchema,
      "The Order Updates",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      OrderSchema,
      "The updated Order",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "Order Not Found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(UpdateOrderSchema), createErrorSchema(IdParamSchema)],
      "The Validation Errors",
    ),
  },
});

export const remove = createRoute({
  path: "/orders/{id}",
  method: "delete",
  request: {
    params: IdParamSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      DeleteResponseSchema,
      "Order Deleted",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      IdParamSchema,
      "Invalid Id Error",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "Order Not Found",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;