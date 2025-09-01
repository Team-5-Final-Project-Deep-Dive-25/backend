import asyncWrapper from "../../middlewares/asyncWrapper.js";
import {User} from "../../models/userModel.js";

export const getProfile = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "User profile retrieved successfully",
    data: user,
  });
});
