import { User } from "../../models/userModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import generateToken from "../../utilities/generateJWT.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { name, email, password, gender, address } = req.body;

  const olduser = await User.findOne({ email: req.body.email.toLowerCase() });
  if (olduser) {
    return res
      .status(400)
      .json({ status: 400, success: FAIL, message: "user already exist." });
  }
  const hashedpassword = await bcrypt.hash(password, 15);
  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: hashedpassword,
    gender,
    address,
  });
  await newUser.save();

  const token = await generateToken({
    id: newUser._id,
    role: newUser.role,
  });

  res.status(201).json({
    status: 201,  
    success: SUCCESS,
    message: "User registered succesfully",
    data: {
      token,
      role: newUser.role,
    },
  });
};
