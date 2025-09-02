import { Category } from "../../models/categoryModel.js";
import { Discount } from "../../models/discountModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";

const updateOne = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  if (req.body.discountId) {
    const existingDiscount = await Discount.findById(req.body.discountId);
    if (!existingDiscount) {
      return res.status(400).json({
        success: FAIL,
        status: 400,
        message: "Discount is not found",
      });
    }
  }
  const category = await Category.findOneAndUpdate(
    { _id: id, deleted_at: null },
    updateData,
    { new: true }
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
    message: "Category Updated Successfully",
    data: category,
  });
};
export default updateOne;
