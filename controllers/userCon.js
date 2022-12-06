import User from "../models/User.js";

// Update User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userUpdate = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(userUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get
export const singleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const gUser = await User.findById(id);
    res.status(200).json(gUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All
export const allUsers = async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
