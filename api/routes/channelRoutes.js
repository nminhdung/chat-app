import { Router } from "express";
import { channelController } from "../controllers/ChannelController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const channelRoutes = Router();

channelRoutes.post(
  "/create-channel",
  verifyToken,
  channelController.createChannel
);
channelRoutes.get(
  "/get-user-channels",
  verifyToken,
  channelController.getUserChannels
);
channelRoutes.get(
  "/get-messages-channel/:channelId",
  verifyToken,
  channelController.getChannelMessages
);
export default channelRoutes;
