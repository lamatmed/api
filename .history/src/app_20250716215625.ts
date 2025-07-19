import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";

import home from "@/routes/home/home.index";
import products from "@/routes/products/products.index";
import users from "@/routes/users/users.index";
import orders from "@/routes/orders/orders.index"
import sales from "./routes/sales/sales.index";
const app = createApp();

const routes = [
  home,
  products,
  users,
  orders,
  SaleSchema

];
configureOpenAPI(app);
routes.forEach((route) => {
  app.route("/", route);
});
export default app;
