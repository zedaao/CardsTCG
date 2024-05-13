import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

export const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.createTaskUser);
userRoutes.get("/", userController.getUser);
userRoutes.patch("/", authenticationMiddleware, userController.updateTaskUser);
userRoutes.delete("/", authenticationMiddleware, userController.deleteTaskUser);
