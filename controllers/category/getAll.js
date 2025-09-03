import { Category } from "../../models/categoryModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";

export const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const categories = await Category.find(
    { deleted_at: null },
    { __v: 0, updatedAt: 0, deleted_at: 0 }
  )
    .skip(skip)
    .limit(limit)
    .populate(
      "discountId",
      "-__v -updatedAt -createdAt -deleted_at -productId -categoryId"
    );
  const total = await Category.countDocuments({ deleted_at: null });

  if (!categories || categories.length === 0) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Categories are not found",
    });
  }

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "All Categories Retrieved Successfully",
    data: categories,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
};
export default getAll;
