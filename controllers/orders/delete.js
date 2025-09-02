import Order from "../../models/orderModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const deleteOne = async (req, res) => {
  const orderId = req.params.id;
  const buyerID = req.user.id;
  const order = await Order.findOne({
    _id: orderId,
    buyerID,
    deleted_at: null,
  });
  if (!order) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Order is not found",
    });
  }
  order.deleted_at = new Date();
  await order.save();
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Order Deleted Successfully",
  });
};

export default deleteOne;
