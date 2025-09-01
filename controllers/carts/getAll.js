import Cart from "../../models/cartModel.js";

const getAllCartItems = async (req, res) => {
  const { buyerID } = req.user._id;
  const filter = buyerID ? { buyerID } : {};
  const cartItems = await Cart.find(filter, {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  }).populate("productID");

  res.json({
    status: 200,
    success: "success",
    message: "Cart items fetched successfully",
    data: cartItems,
  });
};

export default getAllCartItems;
