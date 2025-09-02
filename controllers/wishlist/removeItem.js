import { Wishlist } from "../../models/wishlistModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
export const removeItem = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  if (!productId) {
    return res
      .status(400)
      .json({ success: FAIL, status: 400, message: "No productId provided" });
  }
  const wishlist = await Wishlist.findOne({ userId, deleted_at: null });
  if (!wishlist) {
    return res
      .status(404)
      .json({ success: FAIL, status: 404, message: "Wishlist is not found" });
  }
  wishlist.productId = wishlist.productId.filter(
    (id) => id.toString() !== productId
  );
  await wishlist.save();
  return res.status(200).json({
    success: SUCCESS,
    status: 200,
    message: "Removed from wishlist",
    data: wishlist,
  });
};
