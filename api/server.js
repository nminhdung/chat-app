import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import contactsRoutes from "./routes/contactRoutes.js";
import setUpSocket from "./setupSocket.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const dataURL = process.env.MONGO_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN_URL],
    method: ["GET", "POST", "PUT", "DELETE", "PATH"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/message", messageRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
setUpSocket(server);
mongoose
  .connect(dataURL)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error.message));
