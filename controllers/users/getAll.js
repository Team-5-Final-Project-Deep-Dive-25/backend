import { User } from "../../models/userModel.js";
import { SUCCESS } from "../../utilities/successWords.js";

export const getAllUsers = async (req, res) => {
  const quary = req.query;
  const limit = quary.limit || 6;
  const page = quary.page || 1;
  const skip = (page - 1) * limit;
  const user = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  if (user.length === 0) {
    return res.status(404).json({
      success: "fail",
      status: 404,
      message: "No users found",
    });
  }
  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "All users data fetched successfully",
    data: user,
  });
};
