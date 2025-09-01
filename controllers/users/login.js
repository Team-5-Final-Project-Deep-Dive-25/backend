import { User } from "../../models/userModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import bcrypt from "bcrypt";
import generateToken from "../../utilities/generateJWT.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      success: FAIL,
      message: "email and password are required",
    });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(401)
      .json({ status: 401, success: FAIL, message: "invalid credentials" });
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    return res
      .status(401)
      .json({ status: 401, success: FAIL, message: "invalid credentials" });
  }

  const token = await generateToken({
    id: user._id,
    role: user.role,
  });
  return res.status(200).json({
    status: 200,
    success: SUCCESS,
    message: "login successful",
    data: {
      token,
      role: user.role,
    },
  });
};
