import { compare } from "bcrypt";
import { createAccessToken } from "../middlewares/jwt.js";
import User from "../models/user.js";

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email or Password is required.");
    }
    const user = await User.create({ email: email, password: password });
    return res.status(200).json({
      result: user ? user : null,
      success: user ? true : false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email or Password is required.");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User with the given email not found.");
    }
    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(404).send("Password is incorrect.");
    }

    res.cookie("accessToken", createAccessToken(user._id), {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      result: user
        ? {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            profileSetup: user.profileSetup,
            color:user.color
          }
        : null,
      success: user ? true : false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
export const userController = {
  signup,
  login
};
