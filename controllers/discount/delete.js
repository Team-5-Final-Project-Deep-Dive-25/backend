import { Discount } from "../../models/discountModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
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
  const discount = await Discount.findOneAndUpdate(
    { _id: id, deleted_at: null },
    { deleted_at: new Date() },
    { new: true }
  );
  if (!discount) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Discount is not found",
    });
  }
  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Discount Deleted Successfully",
  });
};
export default deleteOne;
