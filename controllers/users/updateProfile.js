import { User } from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import { uploadImg } from "../../utilities/imageHandler.js";

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const {
    firstname,
    lastname,
    email,
    gender,
    address,
    oldPassword,
    newPassword,
  } = req.body;

  const user = await User.findOne({ _id: userId, deleted_at: null });
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
  if (req.file) user.image = (await uploadImg(req.file)).ImgUrl;

  // Handle password change
  if (oldPassword && newPassword) {
    const matched = await bcrypt.compare(oldPassword, user.password);
    if (!matched) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Old password is incorrect",
      });
    }
    user.password = await bcrypt.hash(newPassword, 15);
  }

  await user.save();

  // Split name for response
  let firstName = "";
  let lastName = "";
  if (user.name) {
    const nameParts = user.name.split(" ");
    firstName = nameParts[0] || "";
    lastName = nameParts.slice(1).join(" ") || "";
  }

  return res.status(200).json({
    success: true,
    status: 200,
    data: {
      firstName,
      lastName,
      email: user.email,
      address: user.address,
      gender: user.gender,
      image: user.image,
    },
  });
};
export default updateProfile;
