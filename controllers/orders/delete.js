import Order from "../../models/orderModel.js";

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ success: FAIL, message: "Order not found" });
    }

    res.status(200).json({ success: SUCCESS, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: FALSE, message: error.message });
  }
};

export default deleteOrder;
