/* eslint-disable style/eol-last */
/* eslint-disable perfectionist/sort-imports */
import { createRouter } from "@/lib/create-app";
import * as handlers from "./order-items.handlers";
import * as routes from "./order-items.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.update, handlers.update)
  .openapi(routes.remove, handlers.remove);

export default router;