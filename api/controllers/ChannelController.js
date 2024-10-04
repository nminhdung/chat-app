import mongoose from "mongoose";
import Channel from "../models/channel.js";
import User from "../models/user.js";

const createChannel = async (req, res) => {
  try {
    const { name, members } = req.body;
    const userId = req.userId;

    const admin = await User.findById(userId);
    if (!admin) {
      return res.status(400).send("Admin user not found.");
    }
    const validMembers = await User.find({ _id: { $in: members } });
    if (validMembers.length !== members.length) {
      return res.status(400).send("Some members are not valid users.");
    }
    const newChannel = new Channel({
      name,
      members,
      admin: userId,
    });
    await newChannel.save();
    return res.json({
      success: newChannel ? true : false,
      result: newChannel ? newChannel : null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
const getUserChannels = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const channels = await Channel.find({
      $or: [{ admin: userId }, { members: userId }],
    }).sort({ updatedAt: -1 });

    return res.json({
      success: channels ? true : false,
      result: channels ? channels : [],
    });
  } catch (error) {
    console.log("🚀 ~ getUserChannels ~ error:", error);
    return res.status(500).send("Internal Server Error");
  }
};
const getChannelMessages = async (req, res) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId).populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "firstName lastName email _id image color",
      },
    });
    if (!channel) {
      return res.status(404).send("Channel not found");
    }
    return res.json({
      success: channel ? true : false,
      result: channel ? channel.messages : [],
    });
  } catch (error) {
    console.log("🚀 ~ getChannelMessages ~ error:", error);
  }
};
export const channelController = {
  createChannel,
  getUserChannels,
  getChannelMessages,
};
