import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// Crate Rooms
export const createRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try {
        const saveRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:saveRoom._id}})
        } catch (err) {
            next(err)
        }
       res.status(200).json(saveRoom);
    } catch (err) {
        next(err)
    }

}

// Update Hotel
export const roomUpdate = async (req, res) => {
    const id = req.params.id;
    try {
      const updateRoom = await Room.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateRoom);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  // Delete Hotel
  export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  };
  
  // Get
  export const roomSingle = async (req, res) => {
    const id = req.params.id;
    try {
      const getSingle = await Room.findById(id);
      res.status(200).json(getSingle);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  // Get All
  export const allRoomm = async (req, res, next) => {
    try {
      const allRooms = await Room.find();
      res.status(200).json(allRooms);
    } catch (err) {
      next(err)
    }
  };
  