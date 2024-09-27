import User from "../models/user.js";
import Message from "../models/messages.js";
import mongoose from "mongoose";

const searchContacts = async (req, res, next) => {
  try {
    const { searchTerm } = req.body;
    if (searchTerm === undefined || searchTerm === null) {
      return res.status(200).send("Search term is required");
    }
    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });
    return res.status(200).json({
      success: contacts ? true : false,
      result: contacts ? contacts : null,
    });
  } catch (error) {}
};
const getContactsDM = async (req, res, next) => {
  try {
    let { userId } = req;
    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },
      {
        $sort: { time: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$recipient",
              else: "$sender",
            },
          },
          lastMessageTime: { $first: "$time" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          //1 là hiển thị, 0 là loại bỏ trường đó
          _id: 1,
          lastMessageTime: 1,
          email: "$contactInfo.email",
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          image: "$contactInfo.image",
          color: "$contactInfo.color",
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);

    return res.status(200).json({
      success: contacts ? true : false,
      result: contacts ? contacts : null,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllContacts = async (req, res) => {
  try {
    const users = await User.find(
      { _id: { $ne: req.userId } },
      "firstName lastName _id"
    );
    const contacts = users.map((user) => {
      return {
        label: user.firstName
          ? `${user.firstName} ${user.lastName}`
          : `${user.email}`,
        value: user._id,
      };
    });
    return res.json({
      success: contacts ? true : false,
      result: contacts.length > 0 ? contacts : [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const contactsController = {
  searchContacts,
  getContactsDM,
  getAllContacts,
};
