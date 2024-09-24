import Message from "../models/messages.js";
import { mkdirSync, renameSync } from "fs";

const getMessages = async (req, res) => {
  const user1 = req.userId;
  const user2 = req.body.id;

  if (!user1 || !user2) {
    return res.status(400).send("Both users are required.");
  }
  const messages = await Message.find({
    $or: [
      { sender: user1, recipient: user2 },
      { sender: user2, recipient: user1 },
    ],
  }).sort({ time: 1 });
  return res.json({
    status: messages ? true : false,
    result: messages ? messages : null,
  });
};
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required.");
    }
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentTime = `${day}${month}${year}`;

    let fileDir = `uploads/files/${currentTime}`;
    let fileName = `${fileDir}/${req.file.originalname}`;
    mkdirSync(fileDir, { recursive: true });
    renameSync(req.file.path, fileName);
    return res.json({
      success: true,
      filePath: fileName,
    });
  } catch (error) {
    console.log(error);
  }
};
export const messageController = {
  getMessages,
  uploadFile,
};
