import { Discount } from "../../models/discountModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
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
  const discount = await Discount.findOne(
    { _id: id, deleted_at: null },
    { __v: 0, updatedAt: 0, deleted_at: 0 }
  )
    .populate("productId", "-__v -updatedAt -createdAt -deleted_at")
    .populate("categoryId", "-__v -updatedAt -createdAt -deleted_at");
  if (!discount) {
    return res
      .status(404)
      .json({ success: FAIL, status: 404, message: "Discount not found" });
  }
  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Discount fetched successfully",
    data: discount,
  });
};
export default getOne;
