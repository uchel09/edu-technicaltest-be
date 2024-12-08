import express from "express";
import CategoryController from "../controllers/categoryCtrl.js";

export const categoryRouter = express.Router();

categoryRouter.post("/", CategoryController.create);
categoryRouter.get("/", CategoryController.getAll);
categoryRouter.get("/:id", CategoryController.getById);
categoryRouter.put("/:id", CategoryController.updateById);
categoryRouter.delete("/:id", CategoryController.deleteById);
