import User from "../models/user.js";

const searchContacts = async (req, res, next) => {
    console.log(req.body)
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

export const contactsController = { searchContacts };
