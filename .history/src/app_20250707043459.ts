import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import apiKeys from "@/routes/api-keys/api-keys.index";
import home from "@/routes/home/home.index";
import products from "@/routes/products/products.index";
import users from "@/routes/users/users.index";

const app = createApp();

const routes = [
  home,
  products,
  users,
  apiKeys,
];
configureOpenAPI(app);
routes.forEach((route) => {
  app.route("/", route);
});
export default app;
