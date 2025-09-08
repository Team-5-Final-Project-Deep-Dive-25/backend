import { User } from "../../models/userModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

import crypto from "crypto";
import { sendVerificationEmail } from "../../middlewares/emailVerification.js";
import generateToken from "../../utilities/generateJWT.js";

export const resend = async (req, res) => {
  const { email } = req.body;
  const userVerify = await User.findOne({ email });
  if (userVerify.isVerified === true) {
    return res.status(400).json({
      status: 400,
      success: FAIL,
      message: "This user is already verifyed",
    });
  }
  // const verificationTokenz = crypto.randomBytes(32).toString("hex");
  const verificationTokenz = await generateToken("tokenaa");
  userVerify.verificationToken = verificationTokenz;
  await userVerify.save();
  await sendVerificationEmail(email, verificationTokenz);
  return res.status(200).json({
    status: 200,
    success: SUCCESS,
    message: "the email has been resended ",
  });
};
