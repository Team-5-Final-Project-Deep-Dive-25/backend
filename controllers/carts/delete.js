import Cart from "../../models/cartModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const deleteCartItem = async (req, res) => {
  try {
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

    res.status(200).json({
      success: SUCCESS,
      status: 200,
      message: "Cart item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: FAIL,
      status: 500,
      message: error.message,
    });
  }
};

export default deleteCartItem;
