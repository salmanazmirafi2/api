import express from "express";
import {
  allRoomm,
  createRoom,
  deleteRoom,
  roomSingle,
  roomUpdate,
} from "../controllers/roomCon.js";
import {verifyAdmin} from '../utils/varifiToken.js'


const RoomRoute = express.Router();

RoomRoute.post("/:hotelId",verifyAdmin,  createRoom);
RoomRoute.put("/:id",verifyAdmin, roomUpdate);
RoomRoute.delete("/:id/:hotelid",verifyAdmin, deleteRoom);
RoomRoute.get("/:id", roomSingle);
RoomRoute.get("/", allRoomm);

export default RoomRoute;
