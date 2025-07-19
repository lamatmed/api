/* eslint-disable style/eol-last */
import { z } from "zod";

export const BannerSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  image: z.string().url("Image must be a valid URL"),
  link: z.string().url("Link must be a valid URL").optional().nullable(),
  active: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateBannerSchema = BannerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateBannerSchema = BannerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export type Banner = z.infer<typeof BannerSchema>;
export type CreateBannerInput = z.infer<typeof CreateBannerSchema>;
export type UpdateBannerInput = z.infer<typeof UpdateBannerSchema>;