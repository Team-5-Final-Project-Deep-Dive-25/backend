import Cart from "../../models/cartModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const buyerID = req.user.id;

  const item = await Cart.findById(id);
  if (!item) {
    return res.status(404).json({
      success: FAIL,
      status: 404,
      message: "Cart item not found",
    });
  }

  if (item.buyerID.toString() !== buyerID) {
    return res.status(403).json({
      success: FAIL,
      status: 403,
      message: "Not authorized to delete this cart item",
    });
  }

  await item.deleteOne();

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Cart Deleted Successfully",
  });
};

export default deleteOne;
