import asyncWrapper from "../../middlewares/asyncWrapper.js";
import { User } from "../../models/userModel.js";
import { SUCCESS,FAIL } from "../../utilities/successWords.js";

export const getProfile = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne(
    { _id: userId, deleted_at: null },
    {
      __v: 0,
      updatedAt: 0,
      deleted_at: 0,
    }
  );
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
    message: "User profile Retrieved Successfully",
    data: user,
  });
});
