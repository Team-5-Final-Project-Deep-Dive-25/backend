import { Category } from "../../models/categoryModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";

const updateOne = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id, deleted_at: null },
    updateData,
    { new: true }
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
    message: "Category updated successfully",
    data: category,
  });
};
export default updateOne;
