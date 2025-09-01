import { Category } from "../../models/categoryModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";

const getOne = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOne(
    { _id: id, deleted_at: null },
    { __v: 0, updatedAt: 0, deleted_at: 0 }
  );
  if (!category) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Category not found",
    });
  }
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Category retrieved successfully",
    data: category,
  });
};
export default getOne;
