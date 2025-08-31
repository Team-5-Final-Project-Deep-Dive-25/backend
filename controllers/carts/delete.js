// controllers/cart/delete.js
import Cart from "../../models/cartModel.js";

const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        success: "FAIL",
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: "SUCCESS",
      message: "Cart item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: "FAIL",
      message: error.message,
    });
  }
};

export default deleteCartItem;
