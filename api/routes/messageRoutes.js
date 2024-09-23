import { Router } from "express";
import { messageController } from "../controllers/MessageController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const messageRoutes = Router();

messageRoutes.post("/get-messages", verifyToken, messageController.getMessages);

export default messageRoutes;
