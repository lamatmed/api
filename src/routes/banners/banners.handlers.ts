/* eslint-disable style/eol-last */
/* eslint-disable perfectionist/sort-imports */
import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppRouteHandler } from "@/lib/types";
import prisma from "prisma/db";
import type { CreateRoute, GetOneRoute, ListRoute, RemoveRoute, UpdateRoute } from "./banners.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const banners = await prisma.banner.findMany();
  return c.json(banners);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const data = c.req.valid("json");
  const banner = await prisma.banner.create({ data });
  return c.json(banner, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const banner = await prisma.banner.findUnique({ where: { id } });
  if (!banner) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(banner, HttpStatusCodes.OK);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const banner = await prisma.banner.findUnique({ where: { id } });
  if (!banner) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  const updatedBanner = await prisma.banner.update({ where: { id }, data });
  return c.json(updatedBanner, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const banner = await prisma.banner.findUnique({ where: { id } });
  if (!banner) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  await prisma.banner.delete({ where: { id } });
  return c.json({ message: "Banner Deleted Successfully" }, HttpStatusCodes.OK);
};