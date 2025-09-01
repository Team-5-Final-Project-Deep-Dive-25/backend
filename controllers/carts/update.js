// controllers/cart/update.js
import Cart from "../../models/cartModel.js";

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, productID } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const updatedItem = await Cart.findByIdAndUpdate(
      id,
      { quantity, productID },
      { new: true }
    ).populate("productID");

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default updateCartItem;

