import Order from "../../models/orderModel.js";

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().select("-createdAt -updatedAt -__v")
      .populate("buyerID", "name email");

    res.status(200).json({
      success: true,
      status: 200,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

export default getAllOrders;
