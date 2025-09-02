import { Category } from "../../models/categoryModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";
import mongoose from "mongoose";

const getOne = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid ObjectId",
    });
  }

  const category = await Category.findOne(
    { _id: id, deleted_at: null },
    { __v: 0, updatedAt: 0, deleted_at: 0 }
  );
  if (!category) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Category is not found",
    });
  }
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Category Data Retrieved Successfully",
    data: category,
  });
};
export default getOne;
