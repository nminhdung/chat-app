import { Router } from "express";
import { userController } from "../controllers/UserController.js";

const userRoutes = Router();

userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);

export default userRoutes;