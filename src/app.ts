/* eslint-disable import/newline-after-import */
/* eslint-disable style/semi */
/* eslint-disable style/max-statements-per-line */
/* eslint-disable perfectionist/sort-imports */
import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";

import home from "@/routes/home/home.index";
import products from "@/routes/products/products.index";
import users from "@/routes/users/users.index";
import orders from "@/routes/orders/orders.index"
import sales from "./routes/sales/sales.index";
import banners from "@/routes/banners/banners.index";
import categories from "@/routes/categories/categories.index";
import orderItems from "@/routes/order-items/order-items.index";
const app = createApp();

const routes = [
  home,
  products,
  users,
  orders,
  sales,
  banners,
  categories,
  orderItems,
];
configureOpenAPI(app);
routes.forEach((route) => {
  app.route("/", route);
});
export default app;
