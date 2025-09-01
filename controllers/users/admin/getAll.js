import { User } from "../../../models/userModel.js";
import { SUCCESS, FAIL } from "../../../utilities/successWords.js";

export const getAllUsers = async (req, res) => {
  const query = req.query;
  let limit = Number(query.limit) || 6;
  const page = Number(query.page) || 1;
  if (limit > 50) limit = 50;
  const skip = (page - 1) * limit;

  const totalUsers = await User.countDocuments();

  if (totalUsers === 0) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "No users found",
    });
  }

  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);

  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "All users data fetched successfully",
    data: users,
    meta: {
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      limit,
    },
  });
};
