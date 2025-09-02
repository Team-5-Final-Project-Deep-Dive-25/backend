import { Discount } from "../../models/discountModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const discounts = await Discount.find(
    { deleted_at: null },
    { __v: 0, updatedAt: 0, deleted_at: 0 }
  )
    .populate("productId", "-__v -updatedAt -createdAt -deleted_at")
    .populate("categoryId", "-__v -updatedAt -createdAt -deleted_at")
    .skip(skip)
    .limit(limit);
  if (discounts.length === 0) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Discounts are not found",
    });
  }
  const total = await Discount.countDocuments({ deleted_at: null });

  res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "All Discounts Retrieved Successfully",
    data: discounts,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
};

export default getAll;
