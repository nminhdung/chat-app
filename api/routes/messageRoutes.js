import { Router } from "express";
import { messageController } from "../controllers/MessageController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const messageRoutes = Router();
const upload = multer({ dest: "uploads/files" });
 

messageRoutes.post("/get-messages", verifyToken, messageController.getMessages);
messageRoutes.post("/upload-file", [verifyToken,upload.single('file')],messageController.uploadFile);

export default messageRoutes;
