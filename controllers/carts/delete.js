import Cart from "../../models/cartModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
import mongoose from "mongoose";

const deleteOne = async (req, res) => {
  const buyerID = req.user.id;
  const { productID } = req.params; // productID to remove

  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Invalid product ID",
    });
  }

  const result = await Cart.findOneAndUpdate(
    { buyerID },
    { $pull: { products: { productID: productID } } },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Cart or product not found",
    });
  }

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Product removed from cart successfully",
    cart: result,
  });
};

export default deleteOne;
