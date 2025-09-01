import { User } from "../../../models/userModel.js";
import { SUCCESS, FAIL } from "../../../utilities/successWords.js";

export const changeRole = async (req, res) => {
  const { userId, newRole } = req.body;
  
  if (!userId || !newRole) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "userId and newRole are required",
    });
  }

   const validRoles = ["user", "admin"];
  if (!validRoles.includes(newRole)) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Invalid role",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "User not found",
    });
  }
   
  
if(User.role.ADMIN.count>2)
{

 


  if (user.role === newRole) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "User role is already " + newRole,
    });
  }

  user.role = newRole;
  await user.save();

  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "User role updated successfully",
    data: user,
  });

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "User role updated successfully",
  });
}
};
