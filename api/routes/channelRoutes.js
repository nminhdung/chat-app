import { Router } from "express";
import { channelController } from "../controllers/ChannelController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const channelRoutes = Router();

channelRoutes.post(
  "/create-channel",
  verifyToken,
  channelController.createChannel
);

export default channelRoutes;
