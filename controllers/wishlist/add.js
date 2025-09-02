import { Wishlist } from "../../models/wishlistModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
export const add = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  if (!productId) {
    return res
      .status(400)
      .json({ success: FAIL, status: 400, message: "No productId provided" });
  }
  const ids = Array.isArray(productId) ? productId : [productId];
  let wishlist = await Wishlist.findOne({ userId, deleted_at: null });
  if (!wishlist) {
    wishlist = new Wishlist({ userId, productId: [] });
  }
  // Prevent duplicates
  const existingIds = wishlist.productId.map((id) => id.toString());
  const newIds = ids.filter((id) => !existingIds.includes(id));
  if (newIds.length === 0) {
    return res.status(400).json({
      success: FAIL,
      status: 400,
      message: "Product(s) already in wishlist",
    });
  }
  wishlist.productId.push(...newIds);
  await wishlist.save();
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Added to wishlist",
    data: wishlist,
  });
};
