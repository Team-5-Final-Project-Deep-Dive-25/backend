import { User } from "../../../models/userModel.js";
import { SUCCESS, FAIL } from "../../../utilities/successWords.js";

export const getUsersIds = async (req, res) => {
  const currentUserId = req.user.id;
  const users = await User.find(
    { deleted_at: null, _id: { $ne: currentUserId } },
    { _id: 1, name: 1 }
  );
  if (!users.length) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Users are not found",
    });
  }
  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "User IDs Retrieved Successfully",
    data: users,
  });
};
