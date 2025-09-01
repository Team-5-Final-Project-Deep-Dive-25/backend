import { Discount } from "../../models/discountModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import mongoose from "mongoose";
import { Product } from "../../models/productModel.js";
import { Category } from "../../models/categoryModel.js";
const updateOne = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid ObjectId",
    });
  }
  const oldDiscount = await Discount.findById(id);
  const updateData = req.body;
  // Merge productId if present
  if (req.body.productId) {
    const newIds = Array.isArray(req.body.productId)
      ? req.body.productId.map((id) => id.toString())
      : [req.body.productId.toString()];
    const existingIds = Array.isArray(oldDiscount.productId)
      ? oldDiscount.productId.map((id) => id.toString())
      : [];
    const mergedIds = [...new Set([...existingIds, ...newIds])];
    updateData.productId = mergedIds;
  }
  // Merge categoryId if present
  if (req.body.categoryId) {
    const newIds = Array.isArray(req.body.categoryId)
      ? req.body.categoryId.map((id) => id.toString())
      : [req.body.categoryId.toString()];
    const existingIds = Array.isArray(oldDiscount.categoryId)
      ? oldDiscount.categoryId.map((id) => id.toString())
      : [];
    const mergedIds = [...new Set([...existingIds, ...newIds])];
    updateData.categoryId = mergedIds;
  }

  const discount = await Discount.findOneAndUpdate(
    { _id: id, deleted_at: null },
    updateData,
    { new: true }
  );
  if (!discount) {
    return res
      .status(404)
      .json({ success: FAIL, status: 404, message: "Discount not found" });
  }

  // Update products with discountId
  if (
    updateData.productId &&
    Array.isArray(updateData.productId) &&
    updateData.productId.length > 0
  ) {
    await Product.updateMany(
      { _id: { $in: updateData.productId } },
      { $set: { discountId: discount._id } }
    );
  }
  // Update categories with discountId
  if (
    updateData.categoryId &&
    Array.isArray(updateData.categoryId) &&
    updateData.categoryId.length > 0
  ) {
    await Category.updateMany(
      { _id: { $in: updateData.categoryId } },
      { $set: { discountId: discount._id } }
    );
  }

  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Discount updated successfully",
    data: discount,
  });
};
export default updateOne;
