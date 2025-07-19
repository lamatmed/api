/* eslint-disable style/eol-last */
/* eslint-disable perfectionist/sort-imports */
import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppRouteHandler } from "@/lib/types";
import prisma from "prisma/db";
import type { CreateRoute, GetOneRoute, ListRoute, RemoveRoute, UpdateRoute } from "./orders.routes.ts";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json(orders);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const data = c.req.valid("json");
  const order = await prisma.order.create({ data });
  return c.json(order, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(order, HttpStatusCodes.OK);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  const updatedOrder = await prisma.order.update({ where: { id }, data });
  return c.json(updatedOrder, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  await prisma.order.delete({ where: { id } });
  return c.json({ message: "Order Deleted Successfully" }, HttpStatusCodes.OK);
};