// controllers/cart/getOne.js
import Cart from "../../models/cartModel.js";

const getCartItem = async (req, res) => {
  try {
    const buyerId = req.user.id;

    const cartItem = await Cart.findOne(
      {
        buyerID: buyerId,
        deleted_at: null,
      },
      { __v: 0, createdAt: 0, updatedAt: 0, deleted_at: 0 }
    ).populate("products.productID");

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getCartItem;
