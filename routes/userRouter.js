import express from "express";
import { getAllUsers } from "../controllers/users/getAll.js";
import { login } from "../controllers/users/login.js";
import { register } from "../controllers/users/register.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authrole.js"
import ADMIN from "../utilities/userRoles.js";
// import {getProfile} from "../controllers/users/getProfile.js"
const userRouter = express.Router();

// userRouter.get("/profile", protect, getProfile);

userRouter.get("/allusers", protect, authorizeRoles(ADMIN), getAllUsers);
userRouter.post("/register", register);
userRouter.post("/login", login);
export default userRouter;

