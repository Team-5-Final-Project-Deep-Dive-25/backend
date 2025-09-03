import Cart from "../../models/cartModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const updateOne = async (req, res) => {
  const buyerID = req.user.id;
  const { productID } = req.body;

  const result = await Cart.findOneAndUpdate(
    { buyerID, "products.productID": productID },
    { $inc: { "products.$.quantity": -1 } },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Cart or product not found",
    });
  }

  await Cart.updateOne(
    { buyerID },
    { $pull: { products: { productID, quantity: { $lte: 0 } } } }
  );

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Cart updated successfully",
  });
};

export default updateOne;
