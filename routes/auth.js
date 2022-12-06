import express from "express";
import { login, register } from "../controllers/authCon.js";

const AuthRoute = express.Router();

AuthRoute.post("/register", register);
AuthRoute.post("/login", login);

export default AuthRoute;
