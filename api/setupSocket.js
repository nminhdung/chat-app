import { Server as SocketIoServer } from "socket.io";
import Message from "./models/messages.js";
import Channel from "./models/channel.js";

const setUpSocket = (server) => {
  const io = new SocketIoServer(server, {
    cors: {
      origin: process.env.ORIGIN_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client Disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };
  const sendMessage = async (message) => {
    //lấy ra giá trị của key [message.sender=userId]: socketId
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);

    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id firstName lastName color image")
      .populate("recipient", "id firstName lastName color image");

    if (senderSocketId) {
      //Chỉ có client với socketID là senderSocketID nhận được sự kiện `recieveMessage` và messageData
      io.to(senderSocketId).emit("recieveMessage", messageData);
    }
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recieveMessage", messageData);
    }
  };

  const sendChannelMessage = async (message) => {
    const { channelId, sender, content, messageType, fileUrl } = message;

    const createdMessage = await Message.create({
      sender,
      content,
      recipient: null,
      messageType,
      time: new Date(),
      fileUrl,
    });
    const messageData = await Message.findById(createdMessage._id).populate(
      "sender",
      "id email firstName lastName image color"
    );
    await Channel.findByIdAndUpdate(channelId, {
      $push: { messages: messageData },
    });
    const channel = await Channel.findById(channelId).populate("messages");
    const finalData = { ...messageData._doc, channelId: channel._id };
    if (channel && channel.members) {
      channel.members.forEach((member) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("recieve-channel-message", finalData);
        }
      });
      const adminSocketId = userSocketMap.get(channel.admin._id.toString());
      if (adminSocketId) {
        io.to(adminSocketId).emit("recieve-channel-message", finalData);
      }
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log("User ID not provided during connection");
    }
    socket.on("sendMessage", sendMessage);
    socket.on("send-channel-message", sendChannelMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setUpSocket;
