import Order from "../../models/orderModel.js";

const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("customerID", "name email");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default getOneOrder;
