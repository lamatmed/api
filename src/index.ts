/* eslint-disable style/member-delimiter-style */
import { serve } from "@hono/node-server";

import app from "./app";
import env from "./env";

const port = env.PORT;
serve({
  fetch: app.fetch,
  port,
}, (info: { port: any; }) => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`);
});
