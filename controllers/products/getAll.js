import { Product } from "../../models/productModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";

export const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find(
    { deleted_at: null },
    {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      deleted_at: 0,
    }
  )
    .populate({
      path: "categortyId",
      select: "-__v -updatedAt -createdAt -deleted_at",
    })
    .populate({
      path: "discountId",
      select: "endDate value type",
    })
    .skip(skip)
    .limit(limit);
  if (products.length === 0) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "No Products found",
    });
  }
  const total = await Product.countDocuments({ deleted_at: null });

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Products fetched successfully",
    data: products,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
};

export default getAll;
