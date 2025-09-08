import { User } from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import { uploadImg } from "../../utilities/imageHandler.js";
import {
  sendVerificationEmail,
  sendNotificationEmail,
} from "../../middlewares/emailVerification.js";
import crypto from "crypto";
import generateToken from "../../utilities/generateJWT.js";

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

  let emailChanged = false;

  // Update profile fields

  if (firstname && lastname) user.name = firstname + " " + lastname;
  if (email && email.toLowerCase() !== user.email) {
    emailChanged = true;
    user.email = email.toLowerCase();
    user.isVerified = false;
    // user.verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = await generateToken("tokenaaa");
  }
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
    user.password = await bcrypt.hash(newPassword, 10);
  }

  await user.save();

  // Send email
  if (emailChanged) {
    await sendVerificationEmail(user.email, user.verificationToken);
  } else {
    await sendNotificationEmail(
      user.email,
      "Your profile information has been updated."
    );
  }

  // Split name for response
  let updatedFirstName = "";
  let updatedLastName = "";
  if (user.name) {
    const parts = user.name.split(" ");
    updatedFirstName = parts[0] || "";
    updatedLastName = parts.slice(1).join(" ") || "";
  }

  return res.status(200).json({
    success: true,
    status: 200,
    data: {
      firstname: updatedFirstName,
      lastname: updatedLastName,
      email: user.email,
      address: user.address,
      gender: user.gender,
      image: user.image,
    },
  });
};

export default updateProfile;
