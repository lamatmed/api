import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";
import { DeleteResponseSchema, NotFoundSchema } from "@/lib/constants";
import { CreateBannerSchema, BannerSchema, UpdateBannerSchema } from "./banners.schema";

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

const tags = ["Banners"];

export const list = createRoute({
  path: "/banners",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(BannerSchema),
      "The List of Banners",
    ),
  },
});

export const create = createRoute({
  path: "/banners",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(
      CreateBannerSchema,
      "The Banner to Create",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      BannerSchema,
      "The Created Banner",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(CreateBannerSchema),
      "The Validation Errors",
    ),
  },
});

export const getOne = createRoute({
  path: "/banners/{id}",
  method: "get",
  request: {
    params: IdParamSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      BannerSchema,
      "The requested Banner",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      IdParamSchema,
      "Invalid Id Error",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "Banner Not Found",
    ),
  },
});

export const update = createRoute({
  path: "/banners/{id}",
  method: "patch",
  tags,
  request: {
    params: IdParamSchema,
    body: jsonContentRequired(
      UpdateBannerSchema,
      "The Banner Updates",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      BannerSchema,
      "The updated Banner",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "Banner Not Found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(UpdateBannerSchema), createErrorSchema(IdParamSchema)],
      "The Validation Errors",
    ),
  },
});

export const remove = createRoute({
  path: "/banners/{id}",
  method: "delete",
  request: {
    params: IdParamSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      DeleteResponseSchema,
      "Banner Deleted",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      IdParamSchema,
      "Invalid Id Error",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      NotFoundSchema,
      "Banner Not Found",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove; 