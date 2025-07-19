/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable style/quotes */
/* eslint-disable style/object-curly-spacing */
import bcrypt from "bcryptjs";
import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";

import prisma from "prisma/db";

import type { CreateRoute, GetOneRoute, ListRoute, RemoveRoute, UpdateRoute } from "./users.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return c.json(users);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const data = c.req.valid("json");
  const {
    password,
    name,
    phone,
    email,
    status,
    isVerified,
    token,
    resetExpiry,
    role,
    image,
    emailVerified,
    // Les autres champs sont ignorés à la création (id, createdAt, updatedAt, address, orders, cartItems, products)
  } = data;

  // Hash password if provided
  let hashedPassword;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  const user = await prisma.user.create({
    data: {
      name,
      phone,
      email,
      ...(hashedPassword && { password: hashedPassword }),
      ...(typeof status !== 'undefined' && { status }),
      ...(typeof isVerified !== 'undefined' && { isVerified }),
      ...(typeof token !== 'undefined' && { token }),
      ...(typeof resetExpiry !== 'undefined' && { resetExpiry }),
      ...(typeof role !== 'undefined' && { role }),
      ...(typeof image !== 'undefined' && { image }),
      ...(typeof emailVerified !== 'undefined' && { emailVerified }),
    },
  });

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  return c.json(userWithoutPassword, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return c.json({
      message: "Not Found",
    }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(user, HttpStatusCodes.OK);
};

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return c.json({
      message: "Not Found",
    }, HttpStatusCodes.NOT_FOUND);
  }

  // On n'autorise pas la modification du mot de passe ici
  const {
    name,
    phone,
    email,
    status,
    isVerified,
    token,
    resetExpiry,
    role,
    image,
    emailVerified,
    // Les autres champs sont ignorés (id, createdAt, updatedAt, address, orders, cartItems, products)
  } = data;

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...(typeof name !== 'undefined' && { name }),
      ...(typeof phone !== 'undefined' && { phone }),
      ...(typeof email !== 'undefined' && { email }),
      ...(typeof status !== 'undefined' && { status }),
      ...(typeof isVerified !== 'undefined' && { isVerified }),
      ...(typeof token !== 'undefined' && { token }),
      ...(typeof resetExpiry !== 'undefined' && { resetExpiry }),
      ...(typeof role !== 'undefined' && { role }),
      ...(typeof image !== 'undefined' && { image }),
      ...(typeof emailVerified !== 'undefined' && { emailVerified }),
    },
  });

  // Remove password from response
  const { password: _, ...userWithoutPassword } = updatedUser;

  return c.json(userWithoutPassword, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return c.json({
      message: "Not Found",
    }, HttpStatusCodes.NOT_FOUND);
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });

  return c.json({
    message: "User Deleted Successfully",
  }, HttpStatusCodes.OK);
};
