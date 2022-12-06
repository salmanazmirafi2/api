import express from "express";
import {
  allUsers,
  deleteUser,
  singleUser,
  updateUser,
} from "../controllers/userCon.js";
import { verifyAdmin, verifyUser } from "../utils/varifiToken.js";

const UserRoute = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

// Update
UserRoute.put("/:id", verifyUser, updateUser);
// Delete
UserRoute.delete("/:id", verifyUser, deleteUser);
// Get
UserRoute.get("/:id", verifyUser, singleUser);

// Get All
UserRoute.get("/", verifyAdmin, allUsers);

export default UserRoute;
