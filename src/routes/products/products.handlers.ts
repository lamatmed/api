/* eslint-disable style/brace-style */
/* eslint-disable antfu/if-newline */
/* eslint-disable unicorn/prefer-number-properties */
/* eslint-disable style/comma-dangle */
import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";

import prisma from "prisma/db";

import type { CreateRoute, GetOneRoute, ListByUserIdRoute, ListRoute, RemoveRoute, UpdateRoute } from "./products.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  // Pagination params (optionnels)
  const limit = parseInt(c.req.query("limit") || "10", 10);
  const cursor = c.req.query("cursor");
  const categoryId = c.req.query("categoryId");
  const search = c.req.query("search");

  // Construction du filtre
  const where: any = {};
  if (categoryId) where.categoryId = categoryId;
  if (search) where.name = { contains: search, mode: "insensitive" };

  // Pagination avec cursor (si fourni)
  let products;
  if (cursor) {
    products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: 1,
      cursor: { id: cursor },
    });
  } else {
    products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  // Compte total pour la pagination
  const total = await prisma.product.count({ where });
  const hasMore = products.length === limit;

  return c.json({ data: products, hasMore, total });
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const {
    name,
    slug,
    description,
    image,
    price,
    stock,
    categoryId,
    createdById,
  } = c.req.valid("json");

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      image,
      price,
      stock,
      categoryId,
      createdById,
    },
  });
  return c.json(product, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  // const { color, size } = c.req.valid("query");  // Access query params
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    return c.json({
      message: "Not Found",
    }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(product, HttpStatusCodes.OK);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) {
    return c.json({ message: "Not Found" }, HttpStatusCodes.NOT_FOUND);
  }
  // On retire les champs undefined
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  );
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: filteredData,
  });
  return c.json(updatedProduct, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    return c.json({
      message: "Not Found",
    }, HttpStatusCodes.NOT_FOUND);
  }
  await prisma.product.delete({
    where: {
      id,
    },
  });
  return c.json({
    message: "Product Deleted Successfully",
  }, HttpStatusCodes.OK);
};

export const listByUserId: AppRouteHandler<ListByUserIdRoute> = async (c) => {
  const { userId } = c.req.valid("param");
  // On utilise createdById au lieu de userId
  const products = await prisma.product.findMany({
    where: {
      createdById: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return c.json(products);
};
