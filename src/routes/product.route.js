import { Router } from "express";

import { ProductController } from "../controllers/product.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";
import { adminChckMiddleware } from "../middlewares/admin-check.middlware.js";

export const productRoutes = Router();
const productController = new ProductController();

productRoutes.get("/", productController.getAllProduct);

productRoutes.post(
  "/",
  authenticationMiddleware,
  adminChckMiddleware,
  productController.createTaskProduct
);

productRoutes.get("/:id", productController.getProduct);

productRoutes.patch(
  "/:id",
  authenticationMiddleware,
  adminChckMiddleware,
  productController.updateTaskProduct
);
productRoutes.delete(
  "/:id",
  authenticationMiddleware,
  adminChckMiddleware,
  productController.deleteTaskProduct
);
