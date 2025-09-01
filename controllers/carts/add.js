import Cart from "../../models/cartModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const addCartItem = async (req, res) => {
  const { productID, buyerID, quantity } = req.body;

  if (!productID || !buyerID) {
    return res.status(400).json({
      status: 400,
      success: FAIL,
      message: "productID and buyerID are required",
    });
  }

  let cartItem = await Cart.findOne({ productID, buyerID });

  if (cartItem) {
    cartItem.quantity += quantity || 1;
    await cartItem.save();
  } else {
    cartItem = await Cart.create({ productID, buyerID, quantity });
  }

  res.status(201).json({
    status: 201,
    success: SUCCESS,
    message: "Item added to cart successfully",
    data: cartItem,
  });
};

export default addCartItem;
