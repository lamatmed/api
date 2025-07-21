/* eslint-disable perfectionist/sort-imports */
/* eslint-disable style/eol-last */
/* eslint-disable style/semi */
import app from "../dist/";
import { handle } from "hono/vercel";

export const runtime = "edge";

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
export const HEAD = handle(app)
export const OPTIONS = handle(app)