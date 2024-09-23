import Message from "../models/messages.js";

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

export const messageController = {
  getMessages,
};
