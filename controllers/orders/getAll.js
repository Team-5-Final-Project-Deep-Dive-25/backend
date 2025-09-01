import Order from "../../models/orderModel.js";

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customerID", "name email");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default getAllOrders;
