import { Product } from "../../models/productModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";
import { uploadImg } from "../../utilities/imageHandler.js";
import mongoose from "mongoose";
export const updateOne = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid ObjectId",
    });
  }
  let updateData = { ...req.body };

  if (updateData.price !== undefined)
    updateData.price = Number(updateData.price);
  if (updateData.stock !== undefined)
    updateData.stock = Number(updateData.stock);
  if (updateData.rate !== undefined) updateData.rate = Number(updateData.rate);

  const product = await Product.findOne({ _id: id, deleted_at: null });
  if (!product) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Product not found",
    });
  }
  // Handle multiple image uploads, append to existing images
  let newImages = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const img = await uploadImg(file);
      newImages.push(img.ImgUrl);
    }
  } else if (req.file) {
    const img = await uploadImg(req.file);
    newImages.push(img.ImgUr);
  }
  updateData.images = [...(product.images || []), ...newImages];

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id, deleted_at: null },
    updateData,
    { new: true }
  );
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Product updated successfully",
    data: updatedProduct,
  });
};

export default updateOne;
