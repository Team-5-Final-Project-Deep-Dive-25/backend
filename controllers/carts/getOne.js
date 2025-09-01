// controllers/cart/getOne.js
import Cart from "../../models/cartModel.js";

const getCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const buyerId = req.user._id;

    const cartItem = await Cart.find(
      {
        _id: id,
        buyerID: buyerId,
      },
      { __v: 0, createdAt: 0, updatedAt: 0 }
    ).populate("productID");

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getCartItem;
