import { Category } from "../../models/categoryModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOneAndUpdate(
    { _id: id, deleted_at: null },
    { deleted_at: new Date() },
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
    message: "Category deleted successfully",
  });
};
export default deleteOne;
