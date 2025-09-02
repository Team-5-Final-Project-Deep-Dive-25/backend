// controllers/cart/getAll.js
import Cart from "../../models/cartModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const getAllCartItems = async (req, res) => {
  try {
    const carts = await Cart.find({ deleted_at: null })
      .populate("products.productID")
      .populate("buyerID");

    if (!carts || carts.length === 0) {
      return res.status(404).json({
        status: 404,
        success: FAIL,
        message: "No carts found",
      });
    }

    res.status(200).json({
      status: 200,
      success: SUCCESS,
      data: carts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: FAIL,
      message: error.message,
    });
  }
};

export default getAllCartItems;
