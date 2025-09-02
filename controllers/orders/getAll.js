import Order from "../../models/orderModel.js";
import { FAIL, SUCCESS } from "../../utilities/successWords.js";

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Order.countDocuments({ deleted_at: null });
  const orders = await Order.find({ deleted_at: null })
    .select("-createdAt -updatedAt -__v -deleted_at")
    .populate("buyerID", "name email")
    .skip(skip)
    .limit(limit);
  if (!orders || orders.length === 0) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Orders are not found",
    });
  }
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    data: orders,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
};

export default getAll;
