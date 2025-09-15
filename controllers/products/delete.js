import { Product } from "../../models/productModel.js";
import { SUCCESS } from "../../utilities/successWords.js";
import { deleteImg } from "../../utilities/imageHandler.js";
import mongoose from "mongoose";

export const deleteOne = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid ObjectId",
    });
  }
  const product = await Product.findOne({ _id: id, deleted_at: null });
  if (!product) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Product not found",
    });
  }
  // if (product.images && product.images.length > 0) {
  //   for (const img of product.images) {
  //     await deleteImg(img);
  //   }
  // }
  await Product.findOneAndUpdate(
    { _id: id, deleted_at: null },
    { deleted_at: new Date() },
    { new: true }
  );
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Product deleted successfully",
  });
};

export default deleteOne;
