import Cart from "../../models/cartModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

const addCartItem = async (req, res) => {
  try {
    const { productID, quantity } = req.body;
    const buyerID = req.user.id;

    if (!productID) {
      return res.status(400).json({
        status: 400,
        success: FAIL,
        message: "productID is required",
      });
    }

    let cart = await Cart.findOne({ buyerID });

    if (!cart) {
      cart = await Cart.create({
        buyerID,
        products: [{ productID, quantity: quantity || 1 }],
      });
    } else {
      const existingProduct = cart.products.find(
        (p) => p.productID.toString() === productID
      );

      if (existingProduct) {
        existingProduct.quantity += quantity || 1;
      } else {
        cart.products.push({ productID, quantity: quantity || 1 });
      }

      await cart.save();
    }

    res.status(201).json({
      status: 201,
      success: SUCCESS,
      message: "Item added to cart successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: FAIL,
      message: error.message,
    });
  }
};

export default addCartItem;
