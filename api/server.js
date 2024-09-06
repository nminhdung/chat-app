import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

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

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
mongoose
  .connect(dataURL)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error.message));
