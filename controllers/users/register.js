import { User } from "../../models/userModel.js";
import {SUCCESS, FAIL} from "../../utilities/successWords.js";
import bycrypt from "bcryptjs";
import dotenv from "dotenv";
import asyncWrapper from "../../middlewares/asyncWrapper.js"; 
dotenv.config();
import jwt from "jsonwebtoken";

export const register = asyncWrapper(async (req, res) => {
  const {name, email, password, gender, address } = req.body;
  const olduser = await User.findOne({ email: req.body.email });
  if (olduser) {
    return res
      .status(400)
      .json({ status:400, success:FAIL, message: "user already exist." });
  }
  const hashedpassword = await bycrypt.hash(password, 15);
  const newUser = new User({
    name,
    email,
    password: hashedpassword,
    gender,
    address,
  });


   const token = jwt.sign(
    { id: newUser._id , role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  newUser.token = token;
  await newUser.save();
  res.status(201).json({ status: 201, success: SUCCESS, message: "User added succesfully", data: newUser.role ,token});

});

