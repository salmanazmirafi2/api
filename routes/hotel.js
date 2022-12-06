import express from "express";
import {
  
  countByType,
  countCity,
  createHotel,
  hotel,
  hotelDelete,
  hotelSingle,
  hotelUpdate,
} from "../controllers/hotelCon.js";
import { verifyAdmin } from "../utils/varifiToken.js";

const HotelRoute = express.Router();

// Create
HotelRoute.post("/", verifyAdmin, createHotel);
// Update
HotelRoute.put("/:id", verifyAdmin, hotelUpdate);
// Delete
HotelRoute.delete("/:id", verifyAdmin, hotelDelete);
// Get
HotelRoute.get("/find/:id", hotelSingle);

// Get All
HotelRoute.get("/", hotel);

HotelRoute.get("/countByCity", countCity);
HotelRoute.get("/countByType", countByType);
// HotelRoute.get("/room/:id", getHotelRooms);

export default HotelRoute;
