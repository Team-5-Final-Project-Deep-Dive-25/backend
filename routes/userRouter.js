import express from "express";
import { getAllUsers } from "../controllers/users/getAll.js";
import { login } from "../controllers/users/login.js";
import { register } from "../controllers/users/register.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authrole.js";
import userRoles from "../utilities/userRoles.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

// import {getProfile} from "../controllers/users/getProfile.js"
const userRouter = express.Router();

// userRouter.get("/profile", protect, getProfile);

userRouter.get(
  "/allusers",
  protect,
  authorizeRoles(userRoles.ADMIN),
  asyncWrapper(getAllUsers)
);

userRouter.post("/register", asyncWrapper(register));
userRouter.post("/login", asyncWrapper(login));
export default userRouter;
