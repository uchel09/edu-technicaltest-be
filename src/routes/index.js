
import { categoryRouter } from "./categoryRoute.js";
import { orderRouter } from "./orderRoute.js";
import { productRouter } from "./productRoute.js";
import { userRouter } from "./userRoute.js";

const allRoutes = (app) => {
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/orders", orderRouter);

};

export default allRoutes;
