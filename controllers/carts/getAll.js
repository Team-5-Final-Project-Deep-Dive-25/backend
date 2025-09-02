// controllers/cart/getAll.js
import Cart from "../../models/cartModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Cart.countDocuments({ deleted_at: null });
  const carts = await Cart.find({ deleted_at: null })
    .populate("products.productID")
    .populate("buyerID")
    .skip(skip)
    .limit(limit);

  if (!carts || carts.length === 0) {
    return res.status(404).json({
      status: 404,
      success: FAIL,
      message: "No carts found",
    });
  }

  return res.status(200).json({
    status: 200,
    success: SUCCESS,
    message: "All Carts Retrieved Successfully",
    data: carts,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
};

export default getAll;
