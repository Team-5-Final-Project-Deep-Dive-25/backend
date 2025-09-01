import Cart from "../../models/cartModel.js";

const getAllCartItems = async (req, res) => {
  try {
    const { buyerID } = req.query;
    const filter = buyerID ? { buyerID } : {};
    const cartItems = await Cart.find(filter).populate("productID");

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllCartItems;
