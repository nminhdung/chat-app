import { Router } from "express";
import { userController } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const userRoutes = Router();
const upload = multer({ dest: "uploads/profiles/" });

userRoutes.post("/signup", userController.signup);
userRoutes.post("/login", userController.login);
userRoutes.get("/user-info", [verifyToken], userController.getUserInfo);
userRoutes.put(
  "/update-profile/:id",
  [verifyToken],
  userController.updateUserInfo
);
userRoutes.post(
  "/upload-image",
  [verifyToken, upload.single("profile-image")],
  userController.uploadImage
);
userRoutes.delete(
  "/remove-profile-image",
  verifyToken,
  userController.removeProfileImage
);
userRoutes.post("/logout", userController.logout);
export default userRoutes;
