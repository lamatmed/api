/* eslint-disable style/eol-last */
/* eslint-disable style/semi */
/* eslint-disable antfu/no-import-dist */
/* eslint-disable perfectionist/sort-imports */

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