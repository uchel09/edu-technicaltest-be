import express from "express";
import ProductController from "../controllers/productCtrl.js";


export const productRouter = express.Router();

productRouter.post("/", ProductController.create);
productRouter.get("/", ProductController.getAll);
productRouter.get("/:id", ProductController.getById);
productRouter.put("/:id", ProductController.updateById);
productRouter.delete("/:id", ProductController.deleteById);
