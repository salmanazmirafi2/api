import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/user.js";
import AuthRoute from "./routes/auth.js";
import HotelRoute from "./routes/hotel.js";
import RoomRoute from "./routes/room.js";
import cookieParser from "cookie-parser";

// config
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
// Database Connect
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connect");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("Database disconnect 🙂");
});

// middlewares
app.use(cookieParser());

app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/hotels", HotelRoute);
app.use("/api/rooms", RoomRoute);

// Error Handel
app.use((err, req, res, next) => {
  const errorStatus = err.status;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Server Connect
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connect();
  console.log(`Server running on port ${PORT} 🔥`);
});
