import Order from "../../models/orderModel.js";

const getOne = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, deleted_at: null })
    .select("-createdAt -updatedAt -__v -deleted_at")
    .populate("buyerID", "name email");

  if (!order) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Order not found",
    });
  }

  return res.status(200).json({
    success: true,
    status: 200,
    data: order,
  });
};

export default getOne;
