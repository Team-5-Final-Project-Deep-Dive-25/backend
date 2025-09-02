import Order from "../../models/orderModel.js";

const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, deleted_at: null })
      .select("-createdAt -updatedAt -__v -deleted_at")
      .populate("customerID", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

export default getOneOrder;
