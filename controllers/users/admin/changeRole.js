import { User } from "../../../models/userModel.js";
import { SUCCESS, FAIL } from "../../../utilities/successWords.js";
import userRoles from "../../../utilities/userRoles.js";
export const changeRole = async (req, res) => {
  let { id, newRole } = req.body;
  newRole = newRole.toUpperCase();
  if (!id || !newRole) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "id and newRole are required",
    });
  }

  if (newRole != userRoles.ADMIN && newRole != userRoles.USER) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Invalid role",
    });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "User not found",
    });
  }

  if (user.role === newRole) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "User role is already " + newRole,
    });
  }

  user.role = newRole;
  await user.save();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "User role updated successfully",
  });
};
