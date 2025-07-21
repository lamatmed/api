/* eslint-disable style/no-multiple-empty-lines */
/* eslint-disable style/semi */
/* eslint-disable style/eol-last */
/* eslint-disable antfu/no-import-dist */
/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line ts/ban-ts-comment
/* eslint-disable style/no-multiple-empty-lines */
/* eslint-disable style/semi */
/* eslint-disable style/eol-last */
/* eslint-disable antfu/no-import-dist */
/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error

import { handle } from "hono/vercel";
import app from "../dist/src/app";

export const runtime = "nodejs";

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const HEAD = handle(app);
export const OPTIONS = handle(app);
