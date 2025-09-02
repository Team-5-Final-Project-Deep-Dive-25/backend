import Cart from "../../models/cartModel.js";
import Order from "../../models/orderModel.js";
import { User } from "../../models/userModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const add = async (req, res) => {
  const { status } = req.body;
  const buyerID = req.user.id;
  
  const cart = await Cart.findOne({ buyerID,deleted_at: null }).populate("products.productID");
  if (!cart || cart.products.length === 0) {
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
  const userAddress = await User.findById(buyerID, { address: 1 });
  const order = await Order.create({
    buyerID,
    cartID: cart._id,
    status: status || "pending",
    totalPrice,
    address: userAddress.address,
  });

  // Update product stock based on ordered quantities
  for (const item of cart.products) {
    if (item.productID && item.quantity) {
      const product = item.productID;
      product.stock = Math.max(0, product.stock - item.quantity);
      await product.save();
    }
  }

  return res.status(201).json({
    status: 201,
    success: SUCCESS,
    message: "Order Created Successfully",
    data: order,
  });
};

export default add;
