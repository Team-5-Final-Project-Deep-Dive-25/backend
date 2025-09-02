import { User } from "../../models/userModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import bcrypt from "bcryptjs";

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email, gender, address, image, oldPassword, newPassword } =
    req.body;

  // Find user and ensure not soft deleted
  const user = await User.findOne({ _id: userId, deleted_at: null });
  if (!user) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "User is not found",
    });
  }

  // Update profile fields
  if (name) user.name = name;
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
    success: SUCCESS,
    status: 200,
    message: "Profile Updated Successfully",
    data: {
      name: user.name,
      email: user.email,
      gender: user.gender,
      address: user.address,
      image: user.image,
    },
  });
};
export default updateProfile;
