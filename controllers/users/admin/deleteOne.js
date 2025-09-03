import { User } from "../../../models/userModel.js";
import { SUCCESS, FAIL } from "../../../utilities/successWords.js";

const deleteOne = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId, deleted_at: null });
  if (!user) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "User not found",
    });
  }
  user.deleted_at = new Date();
  await user.save();
  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "User removed successfully",
  });
};
export default deleteOne;
