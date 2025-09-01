import Order from "../../models/orderModel.js";

const addOrder = async (req, res) => {
  try {
    const { customerID, status, total, amount } = req.body;

    const order = new Order({
      customerID,
      status,
      total,
      amount,
    });

    await order.save();
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default addOrder;
