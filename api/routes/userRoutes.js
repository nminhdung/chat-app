import { Router } from "express";
import { userController } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const userRoutes = Router();

userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);
userRoutes.get('/user-info',[verifyToken],userController.getUserInfo)

export default userRoutes;