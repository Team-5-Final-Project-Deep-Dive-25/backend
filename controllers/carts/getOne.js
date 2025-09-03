import Cart from "../../models/cartModel.js";
import { SUCCESS } from "../../utilities/successWords.js";

const getOne = async (req, res) => {
  const buyerId = req.user.id;

  const cart = await Cart.findOne(
    {
      buyerID: buyerId,
      deleted_at: null,
    },
    { __v: 0, createdAt: 0, updatedAt: 0, deleted_at: 0 }
  ).populate({
    path: "products.productID",
    select: "-__v -updatedAt -createdAt -deleted_at",
    populate: [
      {
        path: "categoryId",
        select: "-__v -updatedAt -createdAt -deleted_at",
        populate: {
          path: "discountId",
          select: "endDate value type",
        },
      },
      {
        path: "discountId",
        select: "endDate value type",
      },
    ],
  });

  if (!cart) {
    return res.status(404).json({ message: "Cart is not found" });
  }

  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Cart Data Retrieved Successfully",
    data: cart,
  });
};

export default getOne;
