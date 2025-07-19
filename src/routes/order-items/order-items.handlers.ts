/* eslint-disable style/eol-last */
/* eslint-disable perfectionist/sort-imports */
import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppRouteHandler } from "@/lib/types";
import prisma from "prisma/db";
import type { CreateRoute, GetOneRoute, ListRoute, RemoveRoute, UpdateRoute } from "./order-items.routes.ts";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const orderItems = await prisma.orderItem.findMany();
  return c.json(orderItems);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const data = c.req.valid("json");
  const orderItem = await prisma.orderItem.create({ data });
  return c.json(orderItem, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const orderItem = await prisma.orderItem.findUnique({ where: { id } });
  if (!orderItem) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(orderItem, HttpStatusCodes.OK);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const orderItem = await prisma.orderItem.findUnique({ where: { id } });
  if (!orderItem) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  const updatedOrderItem = await prisma.orderItem.update({ where: { id }, data });
  return c.json(updatedOrderItem, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const orderItem = await prisma.orderItem.findUnique({ where: { id } });
  if (!orderItem) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  await prisma.orderItem.delete({ where: { id } });
  return c.json({ message: "OrderItem Deleted Successfully" }, HttpStatusCodes.OK);
};