import asyncWrapper from "../../middlewares/asyncWrapper.js";
import { User } from "../../models/userModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

export const getProfile = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "User not found",
    });
  }

  const [firstName, ...rest] = user.name.split(" ");
  const lastName = rest.join(" ");

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
});
