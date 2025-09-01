import Cart from "../../models/cartModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const deleteCartItem = async (req, res) => {
  try {
    const buyerID = req.user.id;
    const { productID } = req.body;

    const cart = await Cart.findOne({ buyerID });
    if (!cart) {
      return res.status(404).json({
        success: FAIL,
        status: 404,
        message: "Cart not found",
      });
    }
    const itemIndex = cart.products.findIndex(
      (p) => p.productID.toString() === productID
    );
    if (itemIndex === -1) {
      return res.status(404).json({
        success: FAIL,
        status: 404,
        message: "Product not found in cart",
      });
    }
    cart.products.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({
      success: SUCCESS,
      status: 200,
      message: "Cart item deleted successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: FAIL,
      status: 500,
      message: error.message,
    });
  }
};

export default deleteCartItem;
