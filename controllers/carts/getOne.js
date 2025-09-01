// controllers/cart/getOne.js
import Cart from "../../models/cartModel.js";

const getCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await Cart.findById(id).populate("productID");

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getCartItem;