/* eslint-disable style/eol-last */
/* eslint-disable style/no-trailing-spaces */
/* eslint-disable perfectionist/sort-imports */
import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppRouteHandler } from "@/lib/types";
import prisma from "prisma/db";
import type { CreateRoute, GetOneRoute, ListRoute, RemoveRoute, UpdateRoute } from "./categories.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return c.json(categories);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const data = c.req.valid("json");
  const category = await prisma.category.create({ data });
  return c.json(category, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(category, HttpStatusCodes.OK);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  const updatedCategory = await prisma.category.update({ where: { id }, data });
  return c.json(updatedCategory, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  await prisma.category.delete({ where: { id } });
  return c.json({ message: "Category Deleted Successfully" }, HttpStatusCodes.OK);
};