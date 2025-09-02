import { User } from "../../../models/userModel.js";
import { SUCCESS, FAIL } from "../../../utilities/successWords.js";

export const getAllUsers = async (req, res) => {
  const query = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalUsers = await User.countDocuments({ deleted_at: null });

  if (totalUsers === 0) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Carts are not found",
    });
  }

  const users = await User.find(
    { deleted_at: null },
    {
      __v: false,
      password: false,
      updatedAt: 0,
      deleted_at: 0,
    }
  )
    .limit(limit)
    .skip(skip);

  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "All Users Retrieved Successfully",
    data: users,
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
    limit,
  });
};
