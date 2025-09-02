import { Category } from "../../models/categoryModel.js";
import { Discount } from "../../models/discountModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";

const add = async (req, res) => {
  const { title } = req.body;
  const existingCategory = await Category.findOne({ title, deleted_at: null });
  if (existingCategory) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Category with this title already exists",
    });
  }
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
  const category = new Category(req.body);
  await category.save();
  return res.status(201).json({
    success: SUCCESS,
    status: 201,
    message: "Category Created Successfully",
    data: category,
  });
};
export default add;
