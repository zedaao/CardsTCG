import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { userRoutes } from "./routes/user.route.js";

import { productRoutes } from "./routes/product.route.js";
import { sessionRouter } from "./routes/session.route.js";
import { cartsRouter } from "./routes/carts.route.js";

export class Server {
  constructor(port) {
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
    this.listen(port);
  }

  setMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors({ origin: "*" }));
  }

  setRoutes() {
    this.app.use(express.static("public"));
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/products", productRoutes);
    this.app.use("/api/carts", cartsRouter);
    this.app.use("/api/session", sessionRouter);
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log("App start. Listen at port" + port);
    });
  }
}
