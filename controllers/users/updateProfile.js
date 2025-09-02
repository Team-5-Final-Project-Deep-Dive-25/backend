import asyncWrapper from "../../middlewares/asyncWrapper.js";
import { User } from "../../models/userModel.js";
import bcrypt from "bcryptjs";

export const updateProfile = asyncWrapper(async (req, res) => {
  const userId = req.user.id; 
  let { firstName, lastName, email, address, currentPassword, newPassword } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "User not found",
    });
  }


  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: "Current password is incorrect",
    });
  }


  let updatedPassword = user.password;
  if (newPassword) {
    const salt = await bcrypt.genSalt(10);
    updatedPassword = await bcrypt.hash(newPassword, salt);
  }

  const fullName = `${firstName} ${lastName}`.trim();

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name: fullName, email, address, password: updatedPassword },
    { new: true, runValidators: true }
  );


  const [updatedFirstName, ...rest] = updatedUser.name.split(" ");
  const updatedLastName = rest.join(" ");

  return res.status(200).json({
    success: true,
    status: 200,
    data: {
      firstName: updatedFirstName,
      lastName: updatedLastName,
      email: updatedUser.email,
      address: updatedUser.address,
    },
  });
});
