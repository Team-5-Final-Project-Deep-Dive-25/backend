import { User } from "../../models/userModel.js";
import { SUCCESS,FAIL } from "../../utilities/successWords.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import asyncWrapper from "../../middlewares/asyncWrapper.js";
dotenv.config();
import generateToken from "../../utilities/generateJWT.js";


export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status :400 ,success: FAIL, message: "email and password are required" });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ status: 404, success: FAIL, message: "user not found" });
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (user && matchedPassword) {
    const token = await generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    return res.status(200).json({ status:200 ,success:SUCCESS, data: { token }, message:"login successful"});
  }
});
