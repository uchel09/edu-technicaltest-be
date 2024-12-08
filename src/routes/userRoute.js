import express from "express";
import UserController from "../controllers/userCtrl.js";

export const userRouter = express.Router();

userRouter.post("/register", UserController.register);
userRouter.get("/", UserController.getAll);
userRouter.post("/login", UserController.login);
userRouter.get("/:id", UserController.getById);
userRouter.patch("/:id", UserController.updateById);
userRouter.delete("/:id", UserController.deleteById);
