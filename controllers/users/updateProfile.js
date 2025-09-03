import { User } from "../../models/userModel.js";
import bcrypt from "bcryptjs";


const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const {
    firstname,
    lastname,
    email,
    gender,
    address,
    image,
    oldPassword,
    newPassword,
  } = req.body;

  if (!user) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "User not found",
    });
  }

  // Update profile fields
  if (firstname && lastname) user.name = firstname + " " + lastname;
  if (email) user.email = email.toLowerCase();
  if (gender) user.gender = gender.toUpperCase();
  if (address) user.address = address;
  if (image) user.image = image;

  // Handle password change
  if (oldPassword && newPassword) {
    const matched = await bcrypt.compare(oldPassword, user.password);
    if (!matched) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "Old password is incorrect",
      });
    }
    user.password = await bcrypt.hash(newPassword, 15);
  }

  await user.save();

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
};
export default updateProfile;

