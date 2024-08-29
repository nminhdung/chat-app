import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Password is required"],
  },
  password: { type: String, required: [true, "Password is required"] },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  image: { type: String, required: false },
  color: { type: Number, required: false },
  profileSetup: {
    type: Boolean,
    required: false,
  },
});

userSchema.pre("save", async function (next) {
  // if change password
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("Users", userSchema);
export default User;
