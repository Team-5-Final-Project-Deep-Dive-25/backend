import express from "express";
// const getAllUsers = require("../controllers/users/getAll.js");
import { login } from "../controllers/users/login.js";
import {register } from "../controllers/users/register.js";
// const verifyToken = require("../middleware/verifytoken");
// const allowedTo = require('../middleware/allowedTo');
const userRouter = express.Router();
// router.get('/', verifyToken ,allowedTo(userRoles.ADMIN) , user.getAllUsers);

userRouter.post("/register", register);
userRouter.post("/login", login);
export default userRouter;
