import { Product } from "../../models/productModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";
import mongoose from "mongoose";
export const getOne = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Invalid ObjectId",
    });
  }
  const product = await Product.findOne(
    { _id: id, deleted_at: null },
    {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      deleted_at: 0,
    }
  )
    .populate("categortyId", "-__v -createdAt -updatedAt -deleted_at")
    .populate(
      "discountId",
      "-productId -categoryId -__v -createdAt -updatedAt -deleted_at"
    );
  if (!product) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Product fetched successfully",
    data: product,
  });
};

export default getOne;
