import { Discount } from "../../models/discount.js";
import { SUCCESS } from "../../utilities/successWords.js";

const getAllDiscounts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [discounts, total] = await Promise.all([
      Discount.find(
        { deleted_at: null },
        { __v: 0, updatedAt: 0, deleted_at: 0 }
      )
        .populate("productId")
        .populate("categoryId")
        .skip(skip)
        .limit(limit),
      Discount.countDocuments({ deleted_at: null }),
    ]);

    res.status(200).json({
      success: SUCCESS,
      status: 200,
      message: "All Discounts Fetched successfully",
      data: discounts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: "fail", status: 500, message: error.message });
  }
};

export default getAllDiscounts;
