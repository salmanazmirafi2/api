import Hotel from "../models/Hotel.js";

// Create Hotel
export const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(201).json(saveHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update Hotel
export const hotelUpdate = async (req, res) => {
  const id = req.params.id;
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete Hotel
export const hotelDelete = async (req, res) => {
  const id = req.params.id;
  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get
export const hotelSingle = async (req, res) => {
  const id = req.params.id;
  try {
    const getSingle = await Hotel.findById(id);
    res.status(200).json(getSingle);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All
export const hotel = async (req, res) => {
  const {min,max, ...others}=req.query
  try {
    const allHorel = await Hotel.find({...others, cheapestPrice: {$gt:min | 1, $lt:max || 9999}}).limit(req.query.limit);
    res.status(200).json(allHorel);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Country ?
export const countCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// countByType
export const countByType = async(req,res,next)=>{

  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "Hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
}