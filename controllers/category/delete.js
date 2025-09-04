import { Category } from "../../models/categoryModel.js";
import { Product } from "../../models/productModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";
import mongoose from "mongoose";
const deleteOne = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid ObjectId",
    });
  }
  const category = await Category.findOneAndUpdate(
    { _id: id, deleted_at: null },
    { deleted_at: new Date() },
    { new: true }
  );
  if (!category) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Category is not found",
    });
  }
  const categoryRelatedProducts = await Product.find({
    categoryId: id,
    deleted_at: null,
  });

  for (const product of categoryRelatedProducts) {
    product.categoryId = null;
    await product.save();
  }

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Category Deleted Successfully",
  });
};
export default deleteOne;
