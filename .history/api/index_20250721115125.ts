/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line antfu/no-import-dist

import app from "../dist/src/app.js";
import { handle } from "hono/vercel";

export const runtime = "edge";

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
export const HEAD = handle(app)
export const OPTIONS = handle(app)