import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";
import { DeleteResponseSchema, NotFoundSchema } from "@/lib/constants";
import { CreateSaleSchema, SaleSchema, UpdateSaleSchema } from "./sales.schema";

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

const tags = ["Sales"];

export const list = createRoute({
  path: "/sales",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(SaleSchema),
      "The List of Sales",
    ),
  },
});

export const create = createRoute({
  path: "/sales",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(
      CreateSaleSchema,
      "The Sale to Create",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      SaleSchema,
      "The Created Sale",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(CreateSaleSchema),
      "The Validation Errors",
    ),
  },
});

export const getOne = createRoute({
  path: "/sales/{id}",
  method: "get",
  request: {
    params: IdParamSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      SaleSchema,
      "The requested Sale",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      IdParamSchema,
      "Invalid Id Error",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "Sale Not Found",
    ),
  },
});

export const update = createRoute({
  path: "/sales/{id}",
  method: "patch",
  tags,
  request: {
    params: IdParamSchema,
    body: jsonContentRequired(
      UpdateSaleSchema,
      "The Sale Updates",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      SaleSchema,
      "The updated Sale",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "Sale Not Found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(UpdateSaleSchema), createErrorSchema(IdParamSchema)],
      "The Validation Errors",
    ),
  },
});

export const remove = createRoute({
  path: "/sales/{id}",
  method: "delete",
  request: {
    params: IdParamSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      DeleteResponseSchema,
      "Sale Deleted",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      IdParamSchema,
      "Invalid Id Error",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "Sale Not Found",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove; 