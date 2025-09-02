
import Cart from "../../models/cartModel.js";
import Order from "../../models/orderModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const buyerID = req.user.id;

    const order = await Order.findOne({ _id: orderId, buyerID });
    if (!order) {
      return res.status(404).json({
        status: 404,
        success: FAIL,
        message: "Order not found",
      });
    }

    const cart = await Cart.findById(order.cartID).populate("products.productID");
    if (!cart || !cart.products.length) {
      return res.status(404).json({
        status: 404,
        success: FAIL,
        message: "Cart not found or empty",
      });
    }

    let total = 0;
    cart.products.forEach((item) => {
      if (item.productID && item.productID.price) {
        total += item.productID.price * item.quantity;
      }
    });

    order.status = status || order.status;
    order.total = total;
    await order.save();

    res.status(200).json({
      status: 200,
      success: SUCCESS,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: FAIL,
      message: error.message,
    });
  }
};

export default updateOrder;
