import Cart from "../../models/cartModel.js";
import Order from "../../models/orderModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const updateOne = async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  // const buyerID = req.user.id;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    return res.status(404).json({
      status: 404,
      success: FAIL,
      message: "Order is not found",
    });
  }

  const cart = await Cart.findById(order.cartID).populate("products.productID");
  if (!cart || !cart.products.length) {
    return res.status(404).json({
      status: 404,
      success: FAIL,
      message: "Cart is not found or empty",
    });
  }

  let totalPrice = 0;
  cart.products.forEach((item) => {
    if (item.productID && item.productID.price) {
      totalPrice += item.productID.price * item.quantity;
    }
  });

  order.status = status || order.status;
  order.totalPrice = totalPrice;
  await order.save();

  return res.status(200).json({
    status: 200,
    success: SUCCESS,
    message: "Order Updated Successfully",
    data: order,
  });
};

export default updateOne;
