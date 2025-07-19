/* eslint-disable style/eol-last */
/* eslint-disable perfectionist/sort-imports */
import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppRouteHandler } from "@/lib/types";
import prisma from "prisma/db";
import type { CreateRoute, GetOneRoute, ListRoute, RemoveRoute, UpdateRoute } from "./sales.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const sales = await prisma.sale.findMany();
  return c.json(sales);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const data = c.req.valid("json");
  const sale = await prisma.sale.create({ data });
  return c.json(sale, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const sale = await prisma.sale.findUnique({ where: { id } });
  if (!sale) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(sale, HttpStatusCodes.OK);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const sale = await prisma.sale.findUnique({ where: { id } });
  if (!sale) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  const updatedSale = await prisma.sale.update({ where: { id }, data });
  return c.json(updatedSale, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const sale = await prisma.sale.findUnique({ where: { id } });
  if (!sale) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  await prisma.sale.delete({ where: { id } });
  return c.json({ message: "Sale Deleted Successfully" }, HttpStatusCodes.OK);
};