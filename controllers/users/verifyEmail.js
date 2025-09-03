import { User } from "../../models/userModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import generateToken from "../../utilities/generateJWT.js";

export const verifyEmail = async (req, res) => {
  
    const { token } = req.query; 

    if (!token) {
      return res.status(400).json({
        status: 400,
        success: FAIL,
        message: "Verification token is missing",
      });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: FAIL,
        message: "Invalid or expired verification token",
      });
    }
     
    user.isVerified = true;
    user.verificationToken = undefined; //expired
    await user.save();
   
  const usertoken = await generateToken({
    id: user._id,
    role: user.role,
  });

    return res.status(200).json({
      status: 200,
      success: SUCCESS,
      usertoken,
      role: newUser.role,
      message: `Email ${user.email} verified successfully!`,
    });

};
