import { Router } from "express";

import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

import { CartsController } from "../controllers/cart.controller.js";

export const cartsRouter = Router();
const cartController = new CartsController();

cartsRouter.get("/closed", authenticationMiddleware, cartController.getCarts);

cartsRouter.post("/", authenticationMiddleware, cartController.createCart);

cartsRouter.get("/", authenticationMiddleware, cartController.getCart);

cartsRouter.patch("/", authenticationMiddleware, cartController.updateCart);

cartsRouter.delete(
  "/:productId",
  authenticationMiddleware,
  cartController.deleteCart
);
