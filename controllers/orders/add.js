
import Cart from "../../models/cartModel.js";
import Order from "../../models/orderModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const addOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const buyerID = req.user.id;

    // جلب الكارت الخاص بالمستخدم مع المنتجات وأسعارها
    const cart = await Cart.findOne({ buyerID }).populate("products.productID");
    if (!cart || !cart.products.length) {
      return res.status(404).json({
        status: 404,
        success: FAIL,
        message: "Cart not found or empty",
      });
    }

    // حساب التوتال
    let total = 0;
    cart.products.forEach((item) => {
      if (item.productID && item.productID.price) {
        total += item.productID.price * item.quantity;
      }
    });

    // إنشاء الأوردر
    const order = await Order.create({
      buyerID,
      cartID: cart._id,
      status: status || "pending",
      total,
    });

    res.status(201).json({
      status: 201,
      success: SUCCESS,
      message: "Order created successfully",
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

export default addOrder;
