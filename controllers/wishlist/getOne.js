import { Wishlist } from "../../models/wishlistModel.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";
export const getOne = async (req, res) => {
  const userId = req.user.id;
  const wishlist = await Wishlist.findOne({
    userId,
    deleted_at: null,
  }).populate("productId");
  if (!wishlist) {
    return res
      .status(404)
      .json({ success: FAIL, status: 404, message: "Wishlist is not found" });
  }
  return res
    .status(200)
    .json({ success: SUCCESS, status: 200, data: wishlist });
};
