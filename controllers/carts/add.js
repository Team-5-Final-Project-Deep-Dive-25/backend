import Cart from "../../models/cartModel.js";

const addCartItem = async (req, res) => {
  try {
    const { productID, buyerID, quantity } = req.body;

    if (!productID || !buyerID) {
      return res.status(400).json({ message: "productID and buyerID are required" });
    }

    let cartItem = await Cart.findOne({ productID, buyerID });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ productID, buyerID, quantity });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default addCartItem;
