import { User } from "../../models/userModel.js";
import {SUCCESS, FAIL} from "../../utilities/successWords.js";
import bycrypt from "bcryptjs";
import jwt from"jsonwebtoken";
import dotenv from "dotenv";
// import {generateToken} from "../../utilities/generateJWT.js"
import asyncWrapper from "../../middlewares/asyncWrapper.js"; 
dotenv.config();
import {ErrorHandler} from "../../utilities/errorHandler.js";

export const register = asyncWrapper(async (req, res) => {
  const { name, email, password, gender, address } = req.body;
  const olduser = await User.findOne({ email: req.body.email });
  if (olduser) {
    return res
      .status(400)
      .json({ status: FAIL, message: "user already exist." });
  }
  const hashedpassword = await bycrypt.hash(password, 15);
  const newUser = new User({
    name,
    email,
    password: hashedpassword,
    gender,
    address,
  });
  newUser.token = token;
  await newUser.save();
  res.status(201).json({ status: SUCCESS, data: { user: newUser } });
});

