/* eslint-disable style/eol-last */
/* eslint-disable style/semi */
import { handle } from "hono/vercel";

/* eslint-disable antfu/no-import-dist */
// eslint-disable-next-line ts/ban-ts-comment

// eslint-disable-next-line perfectionist/sort-imports
import app from "../src/app";

export const runtime = "edge";

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
export const HEAD = handle(app)
export const OPTIONS = handle(app)