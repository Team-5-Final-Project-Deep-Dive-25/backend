import { User } from "../../models/userModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import generateToken from "../../utilities/generateJWT.js";
import bcrypt, { getRounds } from "bcryptjs";
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
  let image = "";
  if (gender.toUpperCase() === "MALE") {
    image =
      "https://res.cloudinary.com/dweffiohi/image/upload/v1756798195/tq5ud769xe3meqlel2lj.jpg";
  } else if (gender.toUpperCase() === "FEMALE") {
    image =
      "https://res.cloudinary.com/dweffiohi/image/upload/v1756798194/kxd3fv4kuoiozsglw1ry.jpg";
  }
  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: hashedpassword,
    gender: gender.toUpperCase(),
    address,
    image,
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
