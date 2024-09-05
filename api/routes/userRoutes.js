import { Router } from "express";
import { userController } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const userRoutes = Router();

userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);
userRoutes.get("/user-info", [verifyToken], userController.getUserInfo);
userRoutes.put("/update-profile/:id", [verifyToken], userController.updateUserInfo);

export default userRoutes;
