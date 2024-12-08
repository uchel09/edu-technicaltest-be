import express from "express";
import OrderController from "../controllers/orderCtrl.js";


export const orderRouter = express.Router();

orderRouter.post("/", OrderController.create);
orderRouter.get("/", OrderController.getAll);
orderRouter.get("/:id", OrderController.getById);
// orderRouter.put("/:id", OrderController.updateById);
orderRouter.delete("/:id", OrderController.deleteById);
