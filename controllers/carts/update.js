import Cart from "../../models/cartModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const updateCartItem = async (req, res) => {
  try {
   
    const buyerID = req.user.id; 
    const { quantity, productID } = req.body;

    const item = await Cart.findOne({buyerID});
    if (!item) {
      return res.status(404).json({
        success: FAIL,
        status: 404,
        message: "Cart item not found",
      });
    }
  
    if ( !quantity ) {
      const q = Number(quantity);
      if (!Number.isFinite(q) || q < 1) {
        return res.status(400).json({
          success: FAIL,
          status: 400,
          message: "Quantity must be a number and at least 1",
        });
      }
    }
       
    if (productID) {
      item.products.push({productID ,quantity}) ;
    }

    await item.save();

    res.status(200).json({
      success: SUCCESS,
      status: 200,
      message: "Cart item updated successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: FAIL,
      status: 500,
      message: error.message,
    });
  }
};

export default updateCartItem;
