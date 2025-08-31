import { User } from "../../models/userModel.js";
// import { SUCCESS } from "../../utilities/successWords.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import asyncWrapper from "../../middlewares/asyncWrapper.js";
dotenv.config();
import {ErrorHandler} from "../../utilities/errorHandler.js";
import generateToken from "../../utilities/generateJWT.js";

export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ErrorHandler("email and password are required", 404, "fail");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new ErrorHandler("user not found", 404, "fail");
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (user && matchedPassword) {
    const token = await generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    return res.json({ status: "success", data: { token } });
  }
  throw new ErrorHandler("error in email or password", 404, "Error");
});
